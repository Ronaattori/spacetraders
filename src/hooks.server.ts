import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
    
    event.locals.apiKey = event.cookies.get("apiKey")
    
    if (!event.url.pathname.startsWith("/user")) {
        if (!event.locals.apiKey) {
            throw redirect(303, "/user/login")
        }
    }

    const respone = await resolve(event)
    return respone    
}