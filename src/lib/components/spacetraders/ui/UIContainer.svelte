<script lang="ts">
    import { mapChildren } from "$lib/lib";

    let container: HTMLElement

</script>

<div class="absolute w-full h-full pointer-events-none" bind:this={container}>
    <slot />
</div>