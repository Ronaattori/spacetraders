<script lang="ts">
    import { twMerge } from "tailwind-merge";

</script>

<div {...$$restProps} class={twMerge("card m-2 p-2 rounded-sm divide-y-2 bg-white", $$props.class)}
on:pointerenter
on:pointerleave
>
    {#if $$slots.header}
        <div>
            <slot name="header" />
        </div>
    {/if}
    <div>
        <slot />
    </div>
</div>