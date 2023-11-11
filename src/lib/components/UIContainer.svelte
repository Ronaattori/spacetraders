<script lang="ts">
    import { onMount } from "svelte";

    let container: HTMLElement
    
    $: addPointerEvents(container);
    function addPointerEvents(element: HTMLElement) {
        if (!element) return; 
        for (const child of element.children) {
            if (!child.classList.contains("pointer-events-auto")) {
                child.classList.add("pointer-events-auto");
            }        
        }
    }
        
</script>

<div class="absolute w-full h-full pointer-events-none" bind:this={container}>
    <slot />
</div>