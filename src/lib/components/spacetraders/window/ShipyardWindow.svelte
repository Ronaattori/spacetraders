<script lang="ts">
    import type { Shipyard } from "$lib/api-sdk";
    import Button from "$lib/components/common/Button.svelte";
    import Table from "$lib/components/common/Table.svelte";
    import ShipyardShipInfo from "../tooltip/ShipyardShipInfo.svelte";
    import { purchaseShip } from "$lib/spaceControls";

    export let shipyard: Shipyard
    
</script>
<Table columns={["Name", "Price", "Type", ""]}>
    {#if shipyard.ships}
        {#each shipyard.ships as ship}
            <tr>
                <td>{ship.name}</td>
                <td>{ship.purchasePrice}</td>
                <td>{ship.type}</td>
                <td>
                    <Button useTooltip={{component: ShipyardShipInfo, props: {ship}}}>
                        Full info
                    </Button>
                    <Button on:click={() => purchaseShip(shipyard, ship.type)}>
                        Buy
                    </Button>
                </td>
            </tr>
        {/each}
    {:else}
        <tr> <td>Move a ship into the Shipyard to see what's for sale</td> </tr>
    {/if}
</Table>