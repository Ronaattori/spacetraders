<script lang="ts">
    import type { ComponentType } from "svelte";

    export let content: string | {component: ComponentType, props: any}
    export let anchorTo: HTMLElement | undefined = undefined;
    
    let tooltip: HTMLElement;


    $: if (tooltip && anchorTo) {
      const height = anchorTo.offsetHeight;
      const width = anchorTo.offsetWidth;
      const rect = anchorTo.getBoundingClientRect();

      tooltip.style.top = `${rect.top + height}px`
      tooltip.style.left = `${rect.left}px`
    }
</script>

<div class="card position-absolute shadow" bind:this={tooltip}>
  <div class="card-body">
    <div class="card-secondary">
        {#if typeof content == "string"}
            {content} 
        {:else}
            <svelte:component this={content.component} {...content.props} />
        {/if}
    </div>
  </div>
</div>