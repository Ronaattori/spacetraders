<script lang="ts">
    import { slide } from "svelte/transition";
    import Card from "./Card.svelte";
    import { IconArrowDown } from "@tabler/icons-svelte";

    export let text:string = "";
    export let open = false;
    export let openMouseover = false;
    
   function pointerenter() {
    if (openMouseover) open = true;
   }
   function pointerleave() {
    if (openMouseover) open = false;
   }
   
</script>

<Card 
on:pointerenter={pointerenter}
on:pointerleave={pointerleave}
>
  <div slot="header">
    <button class="w-full flex" on:click={() => open = !open}>
      {text}
      <IconArrowDown class="ml-auto self-center" size={16}/>
    </button>
  </div>
  {#if open}
      <div transition:slide>
        <slot />
      </div>
  {/if}
</Card>