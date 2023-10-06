import { readable } from "svelte/store";
import { SpacetradersClient } from "./api-sdk/SpacetradersClient";
import { ApiError, BaseHttpRequest, CancelablePromise, type OpenAPIConfig } from "./api-sdk";
import axios from 'axios';
import type { ApiRequestOptions } from "./api-sdk/core/ApiRequestOptions";
import { request as __request } from "./api-sdk/core/request";
import { notifications } from "./stores";

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
        .catch(this.onError);
      })
    }
    onError(error:ApiError) {
      notifications.error(error.body.error.message, error.message);
    }
}
  
const client = new SpacetradersClient({
  TOKEN: async () => localStorage.getItem("apiKey") ?? ""
}, AxiosHttpRequest);

export const api = readable(client);

