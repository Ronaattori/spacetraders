<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship, System, SystemWaypoint, Waypoint } from "$lib/api-sdk";
    import ShipSelector from "$lib/components/ShipSelector.svelte";
    import ThreeCanvas from "$lib/components/three/ThreeCanvas.svelte";
    import ThreeSun from "$lib/components/three/ThreeSun.svelte";
    import ThreeSystemWaypoint from "$lib/components/three/ThreeSystemWaypoint.svelte";
    import { myAgent } from "$lib/stores";
    import ThreeSystem from "$lib/components/three/ThreeSystem.svelte";
    import ThreeShip from "$lib/components/three/ThreeShip.svelte";
    
    $: ships = $myAgent.ships;
    let selectedShip: Ship;
    let system: System;
    $: shipsInSystem = (selectedShip && system) ? ships.filter(ship => ship.nav.systemSymbol == system.symbol) : [];
    let waypoints: Waypoint[] = [];
    
    // Select the first ship if nothing else is specified
    const selectFirst = (ships: Ship[]) => selectedShip = ships[0];
    $: if (ships.length > 0 && !selectedShip) selectFirst(ships)
    
    // System is picked depending on the selected ships location
    async function getSystem (ship: Ship) {
        const newSys = (await api.systems.getSystem(ship.nav.systemSymbol)).data;
        if (system?.symbol == newSys.symbol) return;
        getWaypoints(newSys).then(wps => waypoints = wps); 
        system = newSys;
    }
    $: if (selectedShip) {
        getSystem(selectedShip)
    }
    
    // Fetch all Waypoints in the given system
    async function getWaypoints(system: System, page = 1) {
        let waypoints: Waypoint[] = [];
        let pageSize = 20;
        const res = (await api.systems.getSystemWaypoints(system.symbol, page, pageSize)).data;
        if (res.length == pageSize) {
            const more = (await getWaypoints(system , page+1));
            waypoints = waypoints.concat(more);
        }
        return waypoints;
    }

    async function navigateShip(ship: Ship, toWaypoint: SystemWaypoint) {
        const res = await api.fleet.navigateShip(ship.symbol, {waypointSymbol: toWaypoint.symbol})
        selectedShip = Object.assign(selectedShip, res.data)
    }
</script>

<ShipSelector ships={ships} bind:selectedShip/>

<ThreeCanvas>
    {#if system}
        <ThreeSystem system={system}>
            <ThreeSun meshParamenters={{color: 0xffff00, emissive: 0xffff00}}/>
            {#each system.waypoints as waypoint (waypoint.symbol)}
                <ThreeSystemWaypoint
                    systemWaypoint={waypoint}
                    on:click={() => navigateShip(selectedShip, waypoint)}
                />
            {/each}
            {#each shipsInSystem as ship, i (ship.symbol)}
                <ThreeShip 
                    ship={ship}
                    selected={ship == selectedShip}
                    meshParameters={{color: 0xff0000}}
                />
            {/each}
        </ThreeSystem>
    {/if}
</ThreeCanvas>