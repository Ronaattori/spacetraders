<script lang="ts">
    import type { Notification } from "$lib/stores";
    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";
    import { IconAlertCircle, IconAlertTriangle, IconCheck, IconInfoCircle } from '@tabler/icons-svelte'

    export let notifications: Writable<Array<Notification>>

    const colors = {
        "info": "alert-info",
        "success": "alert-success",
        "warning": "alert-warning",
        "error": "alert-danger",
    }
    const icons = {
        "info": IconInfoCircle,
        "success": IconCheck,
        "warning": IconAlertTriangle,
        "error": IconAlertCircle,
    }

</script>

<div class="position-absolute bottom-0 end-0 w-33" style="transform: translateY(-5rem);">
    {#each $notifications as notification}
       <div class="alert {colors[notification.level]}" role="alert" transition:slide={{duration: 200}}>
            <div class="d-flex gap-2">
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
       </div>
    {/each}
</div>