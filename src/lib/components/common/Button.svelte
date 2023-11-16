<script lang="ts">
    import { tooltip, type TooltipOptions } from "$lib/use";
    import { onMount, type ComponentProps } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge";

    interface $$Props extends HTMLButtonAttributes {
        tooltip?: TooltipOptions
    }

    let button: HTMLButtonElement;

    onMount(() => {
        if ($$props.tooltip != undefined) {
            tooltip(button, $$props.tooltip)
        }
    })
</script>

<button 
{...$$restProps} 
class={twMerge("rounded-md shadow-md p-2 border-2 hover:brightness-90 bg-white", $$props.class)}
bind:this={button}
on:contextmenu|preventDefault
on:click>
    <slot />
</button>