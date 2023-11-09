<script lang="ts">
  import { createEventDispatcher, onMount, type ComponentType } from "svelte";

  export let buttons: HTMLElement
  export let container: HTMLElement;

  const dispatch = createEventDispatcher();
  
  onMount(() => {
    buttons.addEventListener("mouseleave", () => {
      dispatch("mouseleave")
    })
  })
  
  $: if(buttons) addClasses(buttons)
  function addClasses(buttons: HTMLElement) {
    for (const button of buttons.children) {
      button.classList.add("dropdown-item");
    }
  }


</script>

<div class="card position-absolute shadow" style="z-index: 999" bind:this={container}>
    <div class="card-secondary dropdown-menu show" bind:this={buttons} />
</div>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>