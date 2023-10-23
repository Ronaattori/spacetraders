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