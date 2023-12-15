<script context="module" lang="ts">
  export type InteractMenuItem = {
      label: string,
      onClick: (e: MouseEvent) => void
  }
  export type InteractMenuContentComponent = {component: ComponentType, props?: any}
  export type InteractMenuContent = string | InteractMenuItem[] | InteractMenuContentComponent;
</script>
<script lang="ts">
  import { SvelteComponent, type ComponentType, createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import ListItem from "./ListItem.svelte";

  export let content: InteractMenuContent;
  export let anchor: HTMLElement | undefined = undefined;
  export let absolute = true;

  const dispatch = createEventDispatcher();
  let _show = false;
  let buttons: HTMLElement;
  let container: HTMLElement;

  // Check if we were given an array of items
  let items: InteractMenuItem[] = []
  if (content instanceof Array) {
    items = content;
  }
  
  $: if (container && anchor) {
      const height = anchor.offsetHeight;
      const width = anchor.offsetWidth;
      const rect = anchor.getBoundingClientRect();

      container.style.top = `${rect.top + height}px`
      container.style.left = `${rect.left}px`
  }

  export function show() {
    _show = true;
  }
  export function hide() {
    _show = false;
  }
  export function domElement() {
    return container;
  }
  export function add(item: InteractMenuItem) {
    items = [...items, item];
  }

</script>

{#if _show && content}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={container}
class="{absolute ? 'absolute' : ''}"
on:mouseleave={() => dispatch("mouseleave")}
>
  <Card>
    {#if typeof content == "string"}
      {content}
    {:else if (content instanceof Array)}
        <div class="flex flex-col" bind:this={buttons} >
          {#each items as item}
            <ListItem
            class="pointer-events-auto cursor-pointer"
            on:click={item.onClick}> 
              {item.label}
            </ListItem>
          {/each}
        </div>
    {:else} 
        <svelte:component this={content.component} {...content.props} />
    {/if}
  </Card>
</div>
{/if}

<!-- Allow access to passed props from outside this component -->
<!-- <svelte:options accessors/> -->