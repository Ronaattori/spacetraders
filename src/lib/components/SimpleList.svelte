<script lang="ts" generics="T">
    export let items: T[];
</script>

<ul class="flex flex-col gap-2" {...$$restProps}>
    {#each items as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li class="flex hover:shadow-sm hover:border"
        on:click>
            <div class="flex-grow">
                <slot {item} />
            </div>
        </li> 
    {/each}
</ul>