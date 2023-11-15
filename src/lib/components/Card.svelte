<script lang="ts">
    export let color = "bg-white" 
</script>

<div {...$$restProps} class="card m-2 p-2 rounded-sm divide-y-2 {color} {$$props.class ?? ''}">
    {#if $$slots.header}
        <div>
            <slot name="header" />
        </div>
    {/if}
    <div>
        <slot />
    </div>
</div>