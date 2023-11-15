<script context="module" lang="ts">

</script>

<script lang="ts">
    import { IconX } from "@tabler/icons-svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import Card from "./Card.svelte";

    export let title: string;
    
    let header: HTMLElement;
    let container: HTMLElement;
    let moving = false;
    const dispatch = createEventDispatcher();
    
    onMount(() => {
        container.style.left = "50%";
        container.style.top = "50%";
    })
    function onMouseMove(e: MouseEvent) {
        if (!moving) return;
        container.style.top = `${(container.offsetTop  + e.movementY)}px`
        container.style.left = `${(container.offsetLeft  + e.movementX)}px`
    }
</script>

<svelte:window 
on:mouseup={() => moving = false} 
on:mousemove={onMouseMove}
/>

<div class="fixed" bind:this={container}>
    <Card>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div slot="header" class="flex" bind:this={header}
        on:mousedown={() => moving = true}>
            <h3 class="pointer-events-none select-none">{title}</h3>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="ml-auto cursor-pointer" on:click={() => dispatch("close")}>
                <IconX />
            </span>
        </div>
        <slot />
    </Card>
</div>