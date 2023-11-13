<script lang="ts">
    import { mapChildren } from "$lib/lib";

    let container: HTMLElement
    
    // Add pointer events to children of this component
    $: if(container) mapChildren(container, (e) => e.classList.add("pointer-events-auto"))
</script>

<div class="absolute w-full h-full pointer-events-none" bind:this={container}>
    <slot />
</div>