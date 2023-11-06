<script lang="ts">
    import type { Shipyard } from "$lib/api-sdk";
    import { tooltip } from "$lib/use";
    import ShipyardShipInfo from "./ShipyardShipInfo.svelte";
    import Table from "./Table.svelte";
    import Window from "$lib/components/Window.svelte";

    export let shipyard: Shipyard

</script>
<Window title="Shipyard">
    <Table columns={["Name", "Price", "Type", ""]}>
        {#if shipyard.ships}
            {#each shipyard.ships as ship}
                <tr>
                    <td>{ship.name}</td>
                    <td>{ship.purchasePrice}</td>
                    <td>{ship.type}</td>
                    <td>
                        <button class="btn" 
                        use:tooltip={{component: ShipyardShipInfo, props: {ship: ship}}}>
                            Full info
                        </button>
                        <button class="btn">
                            Buy
                        </button>
                    </td>
                </tr>
            {/each}
        {:else}
            <tr> <td>No ships</td> </tr>
        {/if}
    </Table>
</Window>