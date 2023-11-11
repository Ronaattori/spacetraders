<script lang="ts">
    import type { ComponentType } from "svelte";
    import Card from "./Card.svelte";

    export let content: string | {component: ComponentType, props: any}
    export let anchorTo: HTMLElement | undefined = undefined;
    export let css2dObject = false;
    
    let tooltip: HTMLElement;

    $: if (tooltip && anchorTo) {
      const height = anchorTo.offsetHeight;
      const width = anchorTo.offsetWidth;
      const rect = anchorTo.getBoundingClientRect();

      tooltip.style.top = `${rect.top + height}px`
      tooltip.style.left = `${rect.left}px`
    }
</script>


<div bind:this={tooltip}>
  <Card class={`shadow-sm ${css2dObject ? '' : 'absolute'}`}>
      {#if typeof content == "string"}
          {content} 
      {:else}
          <svelte:component this={content.component} {...content.props} />
      {/if}
  </Card>
</div>