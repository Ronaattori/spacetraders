<script lang="ts">
    export let color = "bg-white" 

    let _class: string = ""
    export { _class as class}
</script>

<div class="card m-2 p-2 rounded-sm divide-y-2 {color} {_class}">
    {#if $$slots.header}
        <div>
            <slot name="header" />
        </div>
    {/if}
    <div>
        <slot />
    </div>
</div>