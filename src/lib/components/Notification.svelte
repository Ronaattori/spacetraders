<script lang="ts">
    import type { Notification } from "$lib/stores";
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
    const color = colors[notification.level]

</script>

<div transition:slide={{duration: 200}}>
    <Card class="w-96 {color}">
        <div class="flex gap-2">
            <svelte:component this={icons[notification.level]} size={30}/>
            <div>
                {#if notification.title}
                    <h4>{notification.title}</h4>    
                    <div>{notification.message}</div>
                {:else}
                    <h4>{notification.message}</h4>    
                {/if}
            </div>
        </div>
    </Card>
</div>