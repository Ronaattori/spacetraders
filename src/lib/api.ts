import { readable } from "svelte/store";
import { SpacetradersClient } from "./api-sdk/SpacetradersClient";

export const api = readable(new SpacetradersClient({
    TOKEN: async () => localStorage.getItem("apiKey") ?? ""
}))
