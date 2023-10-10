<script lang="ts">
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Contract } from '$lib/api-sdk';
    import ContractInfo from '$lib/components/ContractInfo.svelte';
    import Table from '$lib/components/Table.svelte';
    import { notifications, myAgent } from '$lib/stores';

    let showInfo:Contract | null

    let contracts:Array<Contract> = [];
    onMount(async () => {
        const res = await $api.contracts.getContracts();
        contracts = res.data;
        $myAgent.acceptedContracts = contracts.filter((x) => x.accepted);
    })

    async function acceptContract(contractId:string) {
      const contract = await $api.contracts.acceptContract(contractId);
      $myAgent = {...$myAgent, ...contract};
      notifications.success("Succesfully accepted contract");
    }
</script>

<Table columns={["Info", "Type", "Faction", "Payment", ""]}>
  {#each contracts as contract}
    <tr>
      <td>
        <button class="btn btn-outline-secondary" 
          on:mouseenter={(e) => showInfo = contract}
          on:mouseleave={() => showInfo = null}>
          Info
        </button>
        {#if showInfo == contract}
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