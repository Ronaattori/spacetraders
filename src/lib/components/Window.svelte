<script context="module" lang="ts">
    let z = 10;
</script>

<script lang="ts">
    import { IconX } from "@tabler/icons-svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import Card from "./Card.svelte";

    export let title: string;
    
    let header: HTMLElement;
    let container: HTMLElement;
    const dispatch = createEventDispatcher();
    
    onMount(() => {
        // Open windows in the middle of the screen
        container.style.left = "50%";
        container.style.top = "50%";

        // Enable window dragging from the header
        let moving = false;
        let prevX: number
        let prevY: number
        header.onmousedown = (e) => {
            e.preventDefault();
            moving = true;
            prevX = e.clientX
            prevY = e.clientY
        }
        header.onmouseup = (e) => moving = false;
        header.onmousemove = (e) => {
            if (!moving) return;
            const curX = prevX - e.clientX;
            const curY = prevY - e.clientY;
            container.style.top = `${(container.offsetTop  - curY)}px`
            container.style.left = `${(container.offsetLeft  - curX)}px`
            prevX = e.clientX
            prevY = e.clientY
        }
    }) 
</script>

<div class="fixed" style="z-index: {z++};" bind:this={container}>
    <Card>
        <div slot="header" class="flex" bind:this={header}>
            <h3>{title}</h3>
            <span class="ml-auto" on:click={() => dispatch("close")}>
                <IconX />
            </span>
        </div>
        <slot />
    </Card>
</div>