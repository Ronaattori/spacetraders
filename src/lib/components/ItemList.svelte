<script lang="ts">
    import { twMerge } from "tailwind-merge";


</script>

<ul {...$$restProps} class={twMerge("flex flex-col gap-2", $$props.class)}>
    <slot />
</ul>