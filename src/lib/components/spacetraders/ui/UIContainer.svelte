<script lang="ts">
    import { mapChildren } from "$lib/lib";

    let container: HTMLElement

</script>

<div class="absolute w-full h-full pointer-events-none grid grid-cols-12 grid-rows-12" bind:this={container}>
    <slot />
</div>