<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let _class: string = ""
    export { _class as class}

    const dispatch = createEventDispatcher();

</script>

<button class="rounded-sm bg-blue-400 {_class}"
on:click>
    <slot />
</button>