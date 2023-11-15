<script lang="ts">
    import type { Contract } from "$lib/api-sdk";

    export let contract: Contract
</script>

<div>
  {#if contract.terms.deliver}
      {#each Object.values(contract.terms.deliver) as x}
        <p>Trade: {x.tradeSymbol} -> {x.destinationSymbol}</p>
        <p>Units required: {x.unitsRequired} </p>
        <p>Units fulfilled: {x.unitsFulfilled} </p>
      {/each}
  {/if}
</div>