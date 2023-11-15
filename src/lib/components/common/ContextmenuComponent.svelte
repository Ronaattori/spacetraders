<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
    import Card from "./Card.svelte";
    import ListItem from "./ListItem.svelte";

  export let buttons: HTMLElement
  export let container: HTMLElement;
  
  type CtxItem = {
    label: string,
    onClick: (e: MouseEvent) => void
  }
  let ctxItems: CtxItem[] = []

  const dispatch = createEventDispatcher();
  
  onMount(() => {
    buttons.addEventListener("mouseleave", () => {
      dispatch("mouseleave")
    })
  })
  
  export function add(ctxItem: CtxItem) {
    ctxItems = [...ctxItems, ctxItem];
  }

</script>

<div bind:this={container}>
  <Card>
      <div class="flex flex-col" bind:this={buttons} >
        {#each ctxItems as item}
          <ListItem
          class="pointer-events-auto cursor-pointer"
          on:click={item.onClick}> 
            {item.label}
          </ListItem>
        {/each}
      </div>
  </Card>
</div>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>