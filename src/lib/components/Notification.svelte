<script lang="ts">
    import type { Notification, NotificationLevel } from "$lib/stores";
    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";
    import { IconAlertCircle, IconAlertTriangle, IconCheck, IconInfoCircle } from '@tabler/icons-svelte'
    import Card from "./Card.svelte";

    export let notification: Notification

    const colors = {
        "info": "bg-white",
        "success": "bg-green-400",
        "warning": "bg-yellow-400",
        "error": "bg-red-400",
    }
    const icons = {
        "info": IconInfoCircle,
        "success": IconCheck,
        "warning": IconAlertTriangle,
        "error": IconAlertCircle,
    }

</script>

<div transition:slide={{duration: 200}}>
    <Card class={colors[notification.level]}>
        <div class="flex gap-2">
            <svelte:component this={icons[notification.level]} size={30}/>
            <div>
                {#if notification.title}
                    <h4 class="alert-title">{notification.title}</h4>    
                    <div class="text-secondary">{notification.message}</div>
                {:else}
                    <h4 class="alert-title">{notification.message}</h4>    
                {/if}
            </div>
        </div>
    </Card>
</div>