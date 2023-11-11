<script lang="ts">
    let _class: string = ""
    export { _class as class}
</script>

<ul class="{_class} flex flex-col gap-2">
    <slot />
</ul>