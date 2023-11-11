<script lang="ts">
  import { createEventDispatcher, onMount, type ComponentType } from "svelte";
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
      button.classList.add("dropdown-item");
      button.style.pointerEvents = "all"
    }
  }


</script>

<div style="z-index: 999" bind:this={container}>
  <Card>
      <div class="flex flex-col" bind:this={buttons}>
      </div>
  </Card>
</div>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>