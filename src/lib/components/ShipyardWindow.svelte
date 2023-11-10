<script lang="ts">
    import type { ShipType, Shipyard } from "$lib/api-sdk";
    import { tooltip } from "$lib/use";
    import ShipyardShipInfo from "./ShipyardShipInfo.svelte";
    import Table from "./Table.svelte";
    import Window from "$lib/components/Window.svelte";
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";

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
                    <button class="btn" 
                    use:tooltip={{component: ShipyardShipInfo, props: {ship: ship}}}>
                        Full info
                    </button>
                    <button class="btn" on:click={() => buyShip(ship.type)}>
                        Buy
                    </button>
                </td>
            </tr>
        {/each}
    {:else}
        <tr> <td>Move a ship into the Shipyard to see what's for sale</td> </tr>
    {/if}
</Table>