<script context="module" lang="ts">
    let z = 10;
</script>

<script lang="ts">
    import { IconX } from "@tabler/icons-svelte";
    import { onMount } from "svelte";

    export let title: string;
    
    let header: HTMLElement;
    let container: HTMLElement;
    
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

<div class="position-fixed" style="z-index: {z++};" bind:this={container}>
    <div class="card">
        <div class="card-header d-flex" bind:this={header}>
            <h3 class="card-title">{title}</h3>
            <span style="margin-left: auto;" on:click={() => container.remove()}>
                <IconX />
            </span>
        </div>
        <div>
            <slot />
        </div>
    </div>
</div>