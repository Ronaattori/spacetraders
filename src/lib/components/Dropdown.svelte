<script lang="ts">
    import { slide } from "svelte/transition";
    import Button from "./Button.svelte";

    export let text:string = "";
    export let open = false;
   
    // Automatically add the .dropdown-menu class to child elements
    // Required by Tabler
    let itemsContainer: HTMLElement;
    // $: addClasses(itemsContainer);
    // function addClasses(element: HTMLElement) {
    //     if (!element) {
    //         return;
    //     }
    //     for (const child of element.children) {
    //         if (!child.classList.contains("dropdown-item")) {
    //             child.classList.add("dropdown-item");
    //         }        
    //     }

    // }
</script>

<div>
    <Button on:click={() => open = !open}>
        {text}
    </Button>
    <div class="" bind:this={itemsContainer}>
      {#if open}
          <div transition:slide>
            <slot />
          </div>
      {/if}
    </div>
</div>