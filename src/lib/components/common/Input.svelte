<script lang="ts">
    import { tooltip, type TooltipOptions } from "$lib/use";
    import { onMount } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge";

    interface $$Props extends HTMLInputAttributes {
        tooltip?: TooltipOptions
    }

    let _tooltip: TooltipOptions | undefined = undefined
    export { _tooltip as tooltip}
    
    let input: HTMLInputElement;

    onMount(() => {
        if (_tooltip != undefined) {
            tooltip(input, _tooltip)
        }
    })
</script>

<input
{...$$restProps} 
class={twMerge("rounded-md shadow-md p-2 border-2 bg-white", $$props.class)}
bind:this={input}
on:contextmenu|preventDefault
on:click >