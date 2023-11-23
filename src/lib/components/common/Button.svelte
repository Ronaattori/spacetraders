<script lang="ts">
    import { contextmenu, dropdown, tooltip } from "$lib/use";
    import { onMount, type ComponentProps } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge";
    import type { InteractMenuContent } from "./InteractMenu.svelte";

    interface $$Props extends HTMLButtonAttributes {
        useTooltip?: InteractMenuContent
        useDropdown?: InteractMenuContent
        useContextmenu?: InteractMenuContent
    }

    let button: HTMLButtonElement;

    onMount(() => {
        if ($$props.useTooltip) tooltip(button, $$props.useTooltip);
        if ($$props.useDropdown) dropdown(button, $$props.useDropdown);
        if ($$props.useContextmenu) contextmenu(button, $$props.useContextmenu);
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