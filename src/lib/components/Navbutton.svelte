<script lang="ts">
    import type { ComponentType } from "svelte";

    export let href:string
    export let icon:ComponentType
</script>

<a {href} class="card shadow-xl bg-white m-2 items-center hover:scale-105">
    <svelte:component this={icon} size={32}/>
    <slot/>
</a>