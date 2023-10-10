<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Contract } from '$lib/api-sdk';
    import ContractInfo from '$lib/components/ContractInfo.svelte';
    import Table from '$lib/components/Table.svelte';

    let contracts:Array<Contract> = [];
    onMount(async () => {
        const res = await $api.contracts.getContracts();
        contracts = res.data;
    })

    function toggleInfo(id: string) {
      const e = document.getElementById(`info_${id}`);
      if (!e) return;
      e.style.display == "none" ? e.style.display = "block" : e.style.display = "none";
    }
</script>

<Table columns={["Info", "Type", "Faction", "Payment", ""]}>
  {#each contracts as contract}
    <tr>
        <td>
          <button class="btn btn-outline-secondary">
            Info
          </button>
          {#if contract.terms.deliver}
            <ContractInfo contract={contract}/>
          {/if}
        </td>
        <td>{contract.type}</td>
        <td>{contract.factionSymbol}</td>
        <td>{contract.terms.payment.onAccepted} / {contract.terms.payment.onFulfilled}</td>
        <td><a href="/contract/accept">Accept</a></td>
    </tr>       
  {/each}
</Table>