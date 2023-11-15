<script lang="ts">
    import { tooltip, type TooltipOptions } from "$lib/use";
    import { onMount } from "svelte";
    import { twMerge } from "tailwind-merge";

    let _tooltip: TooltipOptions | undefined = undefined
    export { _tooltip as tooltip}
    
    let button: HTMLButtonElement;

    onMount(() => {
        if (_tooltip != undefined) {
            tooltip(button, _tooltip)
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