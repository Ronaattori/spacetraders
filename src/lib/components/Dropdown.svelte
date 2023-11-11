<script lang="ts">
    import { slide } from "svelte/transition";
    import Button from "./Button.svelte";

    export let text:string = "";
    export let open = false;
   
</script>

<div>
    <Button on:click={() => open = !open}>
        {text}
    </Button>
    <div>
      {#if open}
          <div transition:slide>
            <slot />
          </div>
      {/if}
    </div>
</div>