<script lang="ts">
    import { mapChildren } from "$lib/lib";

    let container: HTMLElement
    $: if (container) mapChildren(container, (x) => x.style.flexGrow = "1")
</script>

<div class="flex hover:shadow-sm hover:border" bind:this={container}> 
    <slot />
</div>