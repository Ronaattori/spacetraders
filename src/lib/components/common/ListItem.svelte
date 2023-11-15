<script lang="ts">
    import { mapChildren } from "$lib/lib";
    import { twMerge } from 'tailwind-merge';
    
    let container: HTMLElement
    $: if (container) mapChildren(container, (x) => x.style.flexGrow = "1")
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
{...$$restProps}
class={twMerge("flex hover:shadow-sm hover:border", $$props.class)}
bind:this={container}
on:click
> 
    <slot />
</div>