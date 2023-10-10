<script lang="ts">
    export let text:string = "";
   
    // Automatically add the .dropdown-menu class to child elements
    // Required by Tabler
    let itemsContainer: HTMLElement;
    $: addClasses(itemsContainer);
    function addClasses(element: HTMLElement) {
        if (!element) {
            return;
        }
        for (const child of element.children) {
            if (!child.classList.contains("dropdown-item")) {
                child.classList.add("dropdown-item");
            }        
        }

    }
</script>

<div class="nav-item dropdown p-2 ">
    <a href="#top" class="btn dropdown-toggle" data-bs-toggle="dropdown">{text}</a>
    <div class="dropdown-menu" bind:this={itemsContainer}>
      <slot/>
    </div>
</div>