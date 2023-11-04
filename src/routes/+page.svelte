<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship, System, SystemWaypoint } from "$lib/api-sdk";
    import ShipSelector from "$lib/components/ShipSelector.svelte";
    import ThreeCanvas from "$lib/components/three/ThreeCanvas.svelte";
    import ThreeSun from "$lib/components/three/ThreeSun.svelte";
    import ThreeSystemWaypoint from "$lib/components/three/ThreeSystemWaypoint.svelte";
    import { myAgent, notifications } from "$lib/stores";
    import ThreeSystem from "$lib/components/three/ThreeSystem.svelte";
    import { onMount } from "svelte";
    import ThreeShip from "$lib/components/three/ThreeShip.svelte";
    
    $: ships = $myAgent.ships;
    let selectedShip: Ship;
    let system: System;
    $: shipsInSystem = (selectedShip && system) ? ships.filter(ship => ship.nav.systemSymbol == system.symbol) : [];
    
    // Select the first ship if nothing else is specified
    const selectFirst = (ships: Ship[]) => selectedShip = ships[0];
    $: if (ships.length > 0 && !selectedShip) selectFirst(ships)
    
    // System is picked depending on the selected ships location
    const getSystem = async (ship: Ship) => {
        console.log("getting sstem")
        system = (await api.systems.getSystem(ship.nav.systemSymbol)).data;
    }
    $: if (selectedShip) getSystem(selectedShip)

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