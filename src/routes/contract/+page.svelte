<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Contract } from '$lib/api-sdk';
    import ContractInfo from '$lib/components/ContractInfo.svelte';
    import Table from '$lib/components/Table.svelte';
    import { notifications } from '$lib/stores';

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
    async function acceptContract(contractId:string) {
      const contract = await $api.contracts.acceptContract(contractId);
      notifications.success("Succesfully accepted contract");
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
      <td><button class="btn" on:click={() => acceptContract(contract.id)}>Accept</button></td>
    </tr>       
  {/each}
</Table>