<script lang="ts">
    import { tooltip, type TooltipOptions } from "$lib/use";
    import { onMount } from "svelte";

    export let color = "bg-white" 

    let _class: string = ""
    export { _class as class}
    let _tooltip: TooltipOptions | undefined = undefined
    export { _tooltip as tooltip}
    
    let button: HTMLButtonElement;

    onMount(() => {
        if (_tooltip != undefined) {
            tooltip(button, _tooltip)
        }
    })
</script>

<button class="rounded-md shadow-md p-2 border-2 hover:brightness-90 {color} {_class}"
bind:this={button}
on:click>
    <slot />
</button>