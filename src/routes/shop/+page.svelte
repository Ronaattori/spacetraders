<script lang="ts">
    import { api } from "$lib/api";
    import { WaypointTrait, type Ship, type Waypoint, type ShipyardShip, type Shipyard, type Market, type ShipCargo, type ShipCargoItem, TradeSymbol } from "$lib/api-sdk";
    import ShipyardShipInfo from "$lib/components/ShipyardShipInfo.svelte";
    import Table from "$lib/components/Table.svelte";
    import { myAgent, notifications } from "$lib/stores";
    import { tooltip } from "$lib/use";
    import { onMount } from "svelte";

    let selectedShip: Ship
    let waypoints: Array<Waypoint> = [];

    let shipyards: Array<Shipyard> = [];
    let markets: Array<Market> = [];

    $: console.log(selectedShip)
    onMount(async () => {
        $myAgent.ships = (await $api.fleet.getMyShips()).data;
    })
    async function handleSelect(ship: Ship) {
        selectedShip = ship;
        shipyards = [];
        findWaypoints(ship);
    }
    async function findWaypoints(ship: Ship) {
        const res = await $api.systems.getSystemWaypoints(ship.nav.systemSymbol)
        waypoints = res.data;
        waypoints.forEach(async (x) => {
            for (const trait of x.traits) {
                if (trait.symbol == WaypointTrait.symbol.SHIPYARD) {
                    const shipyard = await $api.systems.getShipyard(x.systemSymbol, x.symbol);
                    shipyards = [...shipyards, shipyard.data];
                }
                if (trait.symbol == WaypointTrait.symbol.MARKETPLACE) {
                    const marketplace = await $api.systems.getMarket(x.systemSymbol, x.symbol);
                    markets = [...markets, marketplace.data];
                }
            }
        });
    }
    async function purchaseShip(ship: ShipyardShip, from: Shipyard) {
        if (!ship.type) {
            notifications.warning("Ship type not defined?");
            return;
        }
        const res = await $api.fleet.purchaseShip({
            shipType: ship.type,
            waypointSymbol: from.symbol
        });
        notifications.success(`Ship ${res.data.ship.symbol} succesfully purchased!`)
        $myAgent = {...$myAgent, ...res.data.agent};
        $myAgent.ships = [...$myAgent.ships, res.data.ship];
    }
    async function sellItem(item: ShipCargoItem) {
        const res = $api.fleet.sellCargo(selectedShip.symbol, {
            symbol: item.symbol as TradeSymbol,
            units: item.units
        })
        console.log(res)
        notifications.success(`Item ${item.name} sold`)
    }
</script>
<div>
   Select ship:
   {#each $myAgent.ships as ship}
        <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
        on:click={() => handleSelect(ship)}>
            {ship.symbol}
        </button>
   {/each} 
</div>

{#each shipyards as shipyard}
    <div>
        <h2>{shipyard.symbol}</h2>
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
                            <button class="btn"
                            on:click={() => purchaseShip(ship, shipyard)}>
                                Buy
                            </button>
                        </td>
                    </tr>
                {/each}
                {:else}
                    <tr> <td>No ships</td> </tr>
            {/if}
        </Table>
    </div>
{/each}
{#if selectedShip && selectedShip.cargo}
    <div>
        <Table columns={["Name", "Units", ""]}>
            {#each selectedShip.cargo.inventory as item}
                <tr>
                    <td>{item.name}</td>                    
                    <td>{item.units}</td>                    
                    <td>
                        <button class="btn" on:click={() => sellItem(item)}>
                            Sell
                        </button>
                    </td>                    
                </tr>
            {/each}
        </Table>
    </div>
{/if}

<!-- {#each markets as market}
    <Table columns={["Name"]}>
        {#if market.tradeGoods}
            {#each market.tradeGoods as tradeGood}
                <tr>
                    <td>{tradeGood.symbol}</td> 
                </tr>
            {/each}
        {/if}
    </Table>
{/each} -->