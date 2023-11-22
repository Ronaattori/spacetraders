<script lang="ts">
    import type { ComponentType } from "svelte";
    import Card from "./Card.svelte";
    import ListItem from "./ListItem.svelte";

    export let component: ComponentType | undefined = undefined

    let show = true;
    let buttons: HTMLElement;

    type CtxItem = {
        label: string,
        onClick: (e: MouseEvent) => void
    }
    let ctxItems: CtxItem[] = []
</script>

{#if show}
<div>
  <Card>
    {#if component}
        <svelte:component this={component} />
    {:else} 
        <div class="flex flex-col" bind:this={buttons} >
          {#each ctxItems as item}
            <ListItem
            class="pointer-events-auto cursor-pointer"
            on:click={item.onClick}> 
              {item.label}
            </ListItem>
          {/each}
        </div>
    {/if}
  </Card>
</div>
{/if}
