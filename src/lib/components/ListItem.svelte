<script lang="ts">
    import { mapChildren } from "$lib/lib";

    let _class: string = ""
    export { _class as class}

    let container: HTMLElement
    $: if (container) mapChildren(container, (x) => x.style.flexGrow = "1")
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex hover:shadow-sm hover:border {_class}" bind:this={container}
on:click> 
    <slot />
</div>