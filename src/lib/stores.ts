import { writable } from "svelte/store";
import type { Agent, Contract, Ship } from "./api-sdk";
import type { ComponentType } from "svelte";

export type NotificationLevel =  "info" | "success" | "warning" | "error"
export interface Notification {
    title?: string,
    message: string,
    level: NotificationLevel,
    id: string
}

function createNotifications() {
    const { subscribe, set, update} = writable<Array<Notification>>([]);
    const addNotification = (level:NotificationLevel, message:string, title:string) => {
        update(notifications => {
            const notification:Notification = {
                level: level,
                message: message,
                title: title,
                id: crypto.randomUUID()
            };
            // Make all notifications disappear after X seconds
            setTimeout(() => {
                update((currentNotifications) => {
                    const i = currentNotifications.indexOf(notification);
                    currentNotifications.splice(i, 1);
                    return currentNotifications;
                })
            }, 3000)
            return [...notifications, notification]
        });
    }

    return {
        subscribe,
        set,
        update,
        info: (message:string, title="") => addNotification("info", message, title),
        success: (message:string, title="") => addNotification("success", message, title),
        warning: (message:string, title="") => addNotification("warning", message, title),
        error: (message:string, title="") => addNotification("error", message, title),
    }
}
export const notifications = createNotifications();

interface MyAgent extends Partial<Agent> {
    // TODO Add reactive data as needed later    
    acceptedContracts: Array<Contract>,
    ships: Array<Ship>
}

export const myAgent = writable<MyAgent>({
    acceptedContracts: [],
    ships: [],
});

type CustomWindow = {
    title: string,
    component: ComponentType,
    props: object
}
function createWindowsStore() {
    const { subscribe, set, update} = writable<CustomWindow[]>([]);
    return {
        subscribe,
        add: (title: string, component: ComponentType, props: object) => {
            const newWindow = {
                component,
                props,
                title
            }
            update(curr => curr = [...curr, newWindow])
        },
        remove: (window: CustomWindow) => {
            update(curr => {
                curr.splice(curr.indexOf(window), 1)
                return curr
            })
        }
    }
}
export const windows = createWindowsStore()