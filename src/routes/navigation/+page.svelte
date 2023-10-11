<script lang="ts">
    import { api } from "$lib/api";
    import { WaypointTrait, type Ship, type Waypoint } from "$lib/api-sdk";
    import Table from "$lib/components/Table.svelte";
    import { myAgent } from "$lib/stores";
    import { onMount } from "svelte";

    let selectedShip: Ship
    let waypoints: Array<Waypoint> = [];
    $: shipyards = waypoints.filter((x) => {
        for (const trait of x.traits) {
            if (trait.symbol == WaypointTrait.symbol.SHIPYARD) {
                return true;
            }
        }
    });

    let ships: Array<Ship> = [];
    onMount(async () => {
        ships = (await $api.fleet.getMyShips()).data;
    })
    async function handleSelect(ship: Ship) {
        findWaypoints(ship);
    }
    async function findWaypoints(ship: Ship) {
        const res = await $api.systems.getSystemWaypoints(ship.nav.systemSymbol)
        waypoints = res.data;
        console.log(waypoints)
    }
</script>
<select class="form-select">
   {#each ships as ship}
        <option on:click={() => handleSelect(ship)}>{ship.symbol}</option>
   {/each} 
</select>

<div>
   Shipyards: 
    <Table columns={["Symbol", "Type", ""]}>
        <tr>
            {#each shipyards as shipyard}
                <td>{shipyard.symbol}</td>
                <td>{shipyard.type}</td>
                <td><button class="btn">Show ships</button></td>
            {/each}
        </tr>
    </Table>
</div>