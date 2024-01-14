import { readable } from "svelte/store";
import { SpacetradersClient } from "./api-sdk/SpacetradersClient";
import { ApiError, BaseHttpRequest, CancelablePromise, type Meta, type OpenAPIConfig } from "./api-sdk";
import axios from 'axios';
import type { ApiRequestOptions } from "./api-sdk/core/ApiRequestOptions";
import { request as __request } from "./api-sdk/core/request";
import { notifications } from "./stores";
import { browser } from "$app/environment";
import { getCookies } from "./lib";

// We need a custom class to catch errors nicely
class AxiosHttpRequest extends BaseHttpRequest {
    axiosInstance = axios.create();
  
    constructor(config: OpenAPIConfig) {
      super(config);
    }

    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
      return new CancelablePromise<T>(async (resolve, reject, onCancel) => {
        return __request(this.config, options)
        .then((x:any) => resolve(x))
        .catch(e => {
          this.onError(e)
          reject(e)
        });
      })
    }
    onError(error:ApiError) {
      try {
        notifications.error(error.body.error.message, error.message);
      } catch {
        notifications.error(error.toString());        
      }
      return error
    }
}
  
// Extend the class to add helper functions
class ExtendedSpacetradersClient extends SpacetradersClient {
  /**
   * Repeat a paginated endpoint until all values have been fetched 
   * eg. api.getAll(api.system.getSystemWaypoints, api.system, {systemSymbol: system.symbol})
   * @param callbackFn Any API fetch method thats response is paginated
   * @param thisArg The "this" of callbackFn
   * @param args Arguments passed on to callbackFn
   */
  async getAll<T extends (options: TParams) => Promise<any>, TParams extends Object>(
    callbackFn: T,
    thisArg: any, 
    options: TParams
  ) {
    const results: Awaited<ReturnType<T>>["data"] = [];
    const limit = 20;
    let total: number;

    const getPage = async (page: number) => {
      const res: Awaited<ReturnType<T>> = await callbackFn.call(thisArg, Object.assign(options, {page, limit}));
      if (!("meta" in res) || !("data" in res)) {
        throw "getAll requires a paginated response!"
      }
      const data = res.data as any[];
      data.forEach(item => results.push(item));

      return res.meta as Meta;
    }

    const meta = await getPage(1);
    total = meta.total;

    // Iterate over the pages we still need to fetch
    const pages = [...Array(Math.ceil(total / limit - 1)).keys()].map(i => i + 2)
    const pagesFetching = [];
    for (const page of pages) {
      pagesFetching.push(getPage(page))
    }
    await Promise.allSettled(pagesFetching);

    return results;
  }
}

const client = new ExtendedSpacetradersClient({
  TOKEN: async () => {
    // The server should only call the api when registering. This doesn't need a key
    if (!browser) return ""

    return getCookies().apiKey ?? ""
  }
}, AxiosHttpRequest);

export const api = client

