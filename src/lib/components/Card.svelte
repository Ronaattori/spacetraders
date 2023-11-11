<script lang="ts">
    let _class: string = ""
    export { _class as class}
</script>

<div class="card m-2 p-2 rounded-sm bg-white {_class}">
    {#if $$slots.header}
        <div>
            <slot name="header" />
        </div>
    {/if}
    <slot />
</div>