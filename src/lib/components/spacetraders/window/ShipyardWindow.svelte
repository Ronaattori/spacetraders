<script lang="ts">
    import type { ShipType, Shipyard } from "$lib/api-sdk";
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";
    import Button from "$lib/components/common/Button.svelte";
    import Table from "$lib/components/common/Table.svelte";
    import ShipyardShipInfo from "../tooltip/ShipyardShipInfo.svelte";

    export let shipyard: Shipyard
    
    async function buyShip(shipType?: ShipType) {
        if (!shipType) return
        const res = await api.fleet.purchaseShip({
            waypointSymbol: shipyard.symbol,
            shipType: shipType
        })
        $myAgent.ships.push(res.data.ship);
        $myAgent = Object.assign($myAgent, res.data.agent);
    }

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
                    <Button on:click={() => buyShip(ship.type)}>
                        Buy
                    </Button>
                </td>
            </tr>
        {/each}
    {:else}
        <tr> <td>Move a ship into the Shipyard to see what's for sale</td> </tr>
    {/if}
</Table>