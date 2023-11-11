<script lang="ts">
    import type { Notification } from "$lib/stores";
    import type { Writable } from "svelte/store";
    import { default as NotificationComponent } from "./Notification.svelte";

    export let notifications: Writable<Array<Notification>>

</script>

<div class="absolute bottom-20 right-10">
    {#each $notifications as notification}
       <NotificationComponent notification={notification} />
    {/each}
</div>