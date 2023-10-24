<script lang="ts">
    import { api } from "$lib/api";
    import { ShipNavStatus, type Ship, type Waypoint } from "$lib/api-sdk";
    import ShipInfo from "$lib/components/ShipInfo.svelte";
    import Table from "$lib/components/Table.svelte";
    import { createTimer } from "$lib/lib";
    import { myAgent, notifications } from "$lib/stores";
    import { tooltip } from "$lib/use";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";

    // Update $myAgent when selectedShip changes
    $: selectedShip, $myAgent = $myAgent

    let selectedShip: Ship;
    $: nav = selectedShip?.nav
    let arrivalTime: Writable<number> | null;
    let waypoints: Array<Waypoint> = [];

    onMount(async () => {
        const res = await $api.fleet.getMyShips();
        $myAgent.ships = res.data;
    })
    async function selectShip(ship:Ship) {
        arrivalTime = createTimer(new Date(ship.nav.route.arrival));
        selectedShip = ship;
        waypoints = (await $api.systems.getSystemWaypoints(ship.nav.systemSymbol)).data
    }
    async function orbitShip() {
        const res = await $api.fleet.orbitShip(selectedShip.symbol);
        notifications.success(`Ship ${selectedShip.symbol} succesfully sent to orbit`)
        selectedShip = Object.assign(selectedShip, res.data)
    }
    async function refuelShip() {
        const res = await $api.fleet.refuelShip(selectedShip.symbol);
        notifications.success("Ship refueled");
        $myAgent = Object.assign($myAgent, res.data.agent)
        selectedShip.fuel = res.data.fuel;
    }
    async function dockShip() {
        const res = await $api.fleet.dockShip(selectedShip.symbol);
        notifications.success(`Ship ${selectedShip.symbol} succesfully docked`)
        selectedShip = Object.assign(selectedShip, res.data)
    }
    async function navigateTo(waypoint: string) {
        const res = await $api.fleet.navigateShip(selectedShip.symbol, {waypointSymbol: waypoint});
        notifications.success(`Navigated to ${res.data.nav.waypointSymbol}`)
        selectedShip = Object.assign(selectedShip, res.data)
    }
</script>

<div>
   Select ship:
   {#each $myAgent.ships as ship (ship.symbol)}
        <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
        on:click={() => selectShip(ship)}
        use:tooltip={{component: ShipInfo, props: {ship: ship}}}>
            {ship.symbol}
        </button>
   {/each} 
</div>
{#if selectedShip}
    <h1>
        Current system: {nav.systemSymbol} <br>
        Current waypoint: {nav.waypointSymbol} <br>
        State: {nav.status} <br>
        Time to destination: {$arrivalTime}
    </h1>
    <div>
        {#if nav.status == ShipNavStatus.DOCKED}
            <button class="btn" on:click={orbitShip}>
                Orbit ship
            </button>
            <button class="btn" on:click={refuelShip}>
                Refuel
            </button> 
            {:else}
            <button class="btn" on:click={dockShip}>
                Dock ship
            </button>
        {/if}
    </div>
    Waypoints:
    <Table columns={["Name", "Type", "Traits", "Navigate"]}>
        {#each waypoints as waypoint}
            <tr>
                <td>{waypoint.symbol}</td>
                <td>{waypoint.type}</td>
                <td>
                    {waypoint.traits.map(x => x.name)}
                </td>
                <td>
                    <button class="btn" 
                    on:click={() => navigateTo(waypoint.symbol)}>
                        Jump to
                    </button>
                </td>
            </tr> 
        {/each}
    </Table>
{/if}