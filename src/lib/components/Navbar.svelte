<script lang="ts">

</script>

<aside class="h-screen w-1/12 flex flex-col p-2 bg-slate-400">
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