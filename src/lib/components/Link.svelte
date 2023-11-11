<script lang="ts">
    export let href: string = "#top"

</script>

<a 
{href}
class="flex"
on:click>
    <slot />
</a>