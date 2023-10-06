import { writable } from "svelte/store";

type NotificationLevel =  "info" | "success" | "warning" | "error"
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