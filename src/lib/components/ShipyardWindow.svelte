<script lang="ts">
    import type { ShipType, Shipyard } from "$lib/api-sdk";
    import { tooltip } from "$lib/use";
    import ShipyardShipInfo from "./ShipyardShipInfo.svelte";
    import Table from "./Table.svelte";
    import Window from "$lib/components/Window.svelte";
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";
    import Button from "./Button.svelte";

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
                    <Button tooltip={{component: ShipyardShipInfo, props: {ship}}}>
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