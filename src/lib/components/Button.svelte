<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

</script>

<button class="rounded-sm bg-blue-400"
on:click>
    <slot />
</button>