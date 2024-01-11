import { tweened } from "svelte/motion";
import { writable } from "svelte/store";

export function createTimer(end:Date) {
    const start = new Date();
    const diff = Math.round((end.getTime() - start.getTime()) / 1000)
    const timer = writable(diff);
    if (diff < 0) {
        timer.set(0);
        return timer;
    }

    const interval = setInterval(() => {
        const diff = Math.round((end.getTime() - new Date().getTime()) / 1000)
        if (diff < 0) {
            clearInterval(interval);
            timer.set(0);
        }
        timer.set(diff)
    }, 1000);
    return timer;
}

export function mapChildren(element: HTMLElement, run: (element: HTMLElement) => void) {
    for (const _child of element.children) {
        const child = _child as HTMLElement;
        run(child);
    }
}

export function getCookies(){
    var cookie = document.cookie;
    const cookies = cookie.split('; ');
    const obj: Record<string, string> = {};
    for (let i in cookies) {
        const cur = cookies[i].split('=');
        obj[cur[0]] = cur[1];
    }
    return obj;
}
export function millisecondsUntilDate(date: Date) {
    return Math.round((date.getTime() - new Date().getTime()));        
}