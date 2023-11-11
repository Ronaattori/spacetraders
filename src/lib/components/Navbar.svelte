<script lang="ts">

</script>

<aside class="h-screen basis-1/12 grow-0 shrink-0 flex flex-col p-2 bg-gray-600">
  <slot name="header"/>
  <div class="mt-6">
    <slot />
  </div>
  {#if $$slots.footer}
    <div class="footer mt-auto">
      <slot name="footer"/>
    </div>
  {/if}
</aside>