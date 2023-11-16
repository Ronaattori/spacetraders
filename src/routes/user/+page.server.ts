import { goto } from "$app/navigation";
import { api } from "$lib/api";
import type { FactionSymbols } from "$lib/api-sdk";
import { type Actions, fail, redirect, type Cookies } from "@sveltejs/kit"

export async function load() {
   return {} 
}

function setApiKey(cookies: Cookies, apiKey: string) {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    // Create a browser-accessible cookie that expires in a week
    cookies.set("apiKey", apiKey, {
        httpOnly: false,
        expires: date
    })    
}
export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const apiKey = String(formData.get("apiKey"));

        if (!apiKey) {
            return fail(401, {message: "Please enter an API key"})
        }

        // TODO: Check if the key was valid
        setApiKey(cookies, apiKey)
        throw redirect(307, "/")
    }, 
    logout: async ({ request, cookies }) => {
        cookies.delete("apiKey");
        throw redirect(303, "/user/login")
    },
    register: async ({ request, cookies }) => {
        const formData = await request.formData();
        const symbol = String(formData.get("symbol"));
        const faction = String(formData.get("faction"));

        if (!symbol || !faction) {
            fail(401, {message: "Please enter a symbol and a faction"})
        }

        const res = await api.default.register({
            faction: faction as FactionSymbols,
            symbol: symbol
        });
        const apiKey = res.data.token;
        setApiKey(cookies, apiKey)
        throw redirect(307, "/")
    }
} satisfies Actions