<script lang="ts">
    import { dropdown, tooltip } from "$lib/use";
    import { onMount, type ComponentProps } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge";
    import type { InteractMenuContent } from "./InteractMenu.svelte";

    interface $$Props extends HTMLButtonAttributes {
        tooltip?: InteractMenuContent
        dropdown?: InteractMenuContent
    }

    let button: HTMLButtonElement;

    onMount(() => {
        if ($$props.tooltip) tooltip(button, $$props.tooltip);
        if ($$props.dropdown) dropdown(button, $$props.dropdown);
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