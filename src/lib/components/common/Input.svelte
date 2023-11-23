<script lang="ts">
    import { contextmenu, dropdown, tooltip } from "$lib/use";
    import { onMount } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge";
    import type { InteractMenuContent } from "./InteractMenu.svelte";

    interface $$Props extends HTMLInputAttributes {
        useTooltip?: InteractMenuContent
        useDropdown?: InteractMenuContent
        useContextmenu?: InteractMenuContent
    }
    
    let input: HTMLInputElement;

    onMount(() => {
        if ($$props.useTooltip) tooltip(input, $$props.useTooltip);
        if ($$props.useDropdown) dropdown(input, $$props.useDropdown);
        if ($$props.useContextmenu) contextmenu(input, $$props.useContextmenu);
    })
</script>

<input
{...$$restProps} 
class={twMerge("rounded-md shadow-md p-2 border-2 bg-white", $$props.class)}
bind:this={input}
on:contextmenu|preventDefault
on:click >