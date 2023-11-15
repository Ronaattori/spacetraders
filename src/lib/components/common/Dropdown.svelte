<script lang="ts">
    import { slide } from "svelte/transition";
    import Card from "./Card.svelte";
    import { IconArrowDown } from "@tabler/icons-svelte";

    export let text:string = "";
    export let open = false;
   
</script>

<Card>
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