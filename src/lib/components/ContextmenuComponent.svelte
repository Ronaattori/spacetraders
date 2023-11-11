<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
    import Card from "./Card.svelte";

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
    for (const elem of buttons.children) {
      const button = elem as HTMLElement;
      button.style.pointerEvents = "all"
    }
  }


</script>

<div bind:this={container}>
  <Card>
      <div class="flex flex-col" bind:this={buttons} />
  </Card>
</div>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>