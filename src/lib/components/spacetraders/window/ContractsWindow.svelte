<script lang="ts">
    import type { Contract } from "$lib/api-sdk";
    import Button from "$lib/components/common/Button.svelte";
    import Dropdown from "$lib/components/common/Dropdown.svelte";
    import ItemList from "$lib/components/common/ItemList.svelte";
    import Table from "$lib/components/common/Table.svelte";
    import ThreeCanvas from "$lib/components/three/ThreeCanvas.svelte";
    import { acceptContract } from "$lib/spaceControls";

    export let contracts: Contract[];
    export let canvas: ThreeCanvas | undefined = undefined;
</script>
<ItemList>
    {#each contracts as contract (contract.id)}
        <Dropdown 
        text={contract.type}
        openMouseover={true}
        >
            {#if contract.terms.deliver}
            <Table 
            columns={["Item", "Units", "Destination", ""]}
            >
                {#each contract.terms.deliver as d}
                    <tr>
                        <td>{d.tradeSymbol}</td>
                        <td>{d.unitsFulfilled} / {d.unitsRequired}</td>
                        <td>
                            {#if canvas}
                            <button
                            on:click={() => {
                                canvas?.smoothLookAt(d.destinationSymbol)
                                canvas?.highlight(d.destinationSymbol)
                            }}
                            >
                                {d.destinationSymbol}
                            </button>
                            {:else}
                            {d.destinationSymbol}
                            {/if}
                        </td>
                        <td>
                            <Button on:click={() => acceptContract(contract.id)}>
                                {contract.accepted ? "Accepted!" : "Accept"}
                            </Button>
                        </td>
                    </tr>
                {/each}   
            </Table>
            {/if}
        </Dropdown>
    {/each}
</ItemList>