<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '$lib/api';

    let contracts:Array<any> = [];
    onMount(async () => {
        const res = await $api.contracts.getContracts();
        contracts = res.data.data;
    })
</script>

<div class="table-responsive">
    <table class="table table-vcenter">
      <thead>
        <tr>
          <th>Type</th>
          <th>Faction</th>
          <th>Payment</th>
          <th class="w-1"></th>
        </tr>
      </thead>
      <tbody>
        {#each contracts as contract}
            <tr class="hover:bg-white-200">
                <td>{contract.type}</td>
                <td>{contract.factionSymbol}</td>
                <td>{contract.terms.payment.onAccepted} / {contract.terms.payment.onFulfilled}</td>
                <td><a href="/contract/accept">Accept</a></td>
            </tr>       
        {/each}
      </tbody>
    </table>
  </div>