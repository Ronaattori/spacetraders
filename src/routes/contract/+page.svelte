<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Contract } from '$lib/spacetraders-sdk/dist';

    let contracts:Array<Contract> = [];
    onMount(async () => {
        const res = await $api.contracts.getContracts();
        contracts = res.data.data;
    })

    function toggleInfo(id: string) {
      const e = document.getElementById(`info_${id}`);
      if (!e) return;
      e.style.display == "none" ? e.style.display = "block" : e.style.display = "none";
    }
</script>

<div class="table-responsive">
    <table class="table table-vcenter">
      <thead>
        <tr>
          <th>Info</th>
          <th>Type</th>
          <th>Faction</th>
          <th>Payment</th>
          <th class="w-1"></th>
        </tr>
      </thead>
      <tbody>
        {#each contracts as contract}
            <tr class="hover:bg-white-200">
                <td>
                  <button class="btn btn-outline-secondary" on:click={() => toggleInfo(contract.id)}>
                    Info
                  </button>
                  {#if contract.terms.deliver}
                    <div id="info_{contract.id}" class="card" style="display: none;">
                      <div class="card-body">
                        <div class="card-secondary">
                          {#each Object.values(contract.terms.deliver) as x}
                            <p>Trade: {x.tradeSymbol} -> {x.destinationSymbol}</p>
                            <p>Units required: {x.unitsRequired} </p>
                            <p>Units fulfilled: {x.unitsFulfilled} </p>
                          {/each}
                        </div>
                      </div>
                    </div>
                  {/if}
                </td>
                <td>{contract.type}</td>
                <td>{contract.factionSymbol}</td>
                <td>{contract.terms.payment.onAccepted} / {contract.terms.payment.onFulfilled}</td>
                <td><a href="/contract/accept">Accept</a></td>
            </tr>       
        {/each}
      </tbody>
    </table>
  </div>