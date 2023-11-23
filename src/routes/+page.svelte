<script lang="ts">
    import { api } from "$lib/api";
    import type { WaypointTrait, Ship, System, SystemWaypoint, Waypoint } from "$lib/api-sdk";
    import ShipSelector from "$lib/components/spacetraders/ui/ShipSelector.svelte";
    import ThreeCanvas from "$lib/components/three/ThreeCanvas.svelte";
    import ThreeSun from "$lib/components/three/ThreeSun.svelte";
    import ThreeSystemWaypoint from "$lib/components/three/ThreeSystemWaypoint.svelte";
    import { myAgent, notifications, windows } from "$lib/stores";
    import ThreeSystem from "$lib/components/three/ThreeSystem.svelte";
    import ThreeShip from "$lib/components/three/ThreeShip.svelte";
    import Window from "$lib/components/common/Window.svelte";
    import TopNavbar from "$lib/components/common/TopNavbar.svelte";
    import UiContainer from "$lib/components/spacetraders/ui/UIContainer.svelte";
    import { onMount } from "svelte";
    
    let canvas: ThreeCanvas;
    
    $: ships = $myAgent.ships;
    let selectedShip: Ship;
    let system: System;
    $: shipsInSystem = (selectedShip && system) ? ships.filter(ship => ship.nav.systemSymbol == system.symbol) : [];
    let waypoints: Map<string, Waypoint> = new Map();

    // Fetch our first data
    onMount(async () => {
      const res = await api.agents.getMyAgent();
      const agentData = {...$myAgent, ...res.data};
      const ships = (await api.fleet.getMyShips()).data;
      agentData.ships = ships;
      $myAgent = Object.assign($myAgent, agentData)
    })
    
    // Trigger a refresh on ships when selectedShip changes
    $: selectedShip, ships = ships;
    
    // Select the first ship if nothing else is specified
    const selectFirst = (ships: Ship[]) => selectedShip = ships[0];
    $: if (ships.length > 0 && !selectedShip) selectFirst(ships)
    
    // Update the system and it's related data when the system changes
    async function getSystem (ship: Ship) {
        if (system?.symbol == ship.nav.systemSymbol) return;
        const newSys = (await api.systems.getSystem(ship.nav.systemSymbol)).data;
        notifications.info("Starting to fetch waypoints...")
        getWaypoints(newSys).then(wps => {
            wps.map(wp => waypoints.set(wp.symbol, wp));
            waypoints = waypoints;
            notifications.success("Waypoint fetching done!")
        });
        system = newSys;
    }
    // Update pretty much everything when ship changes
    let prevShip: Ship;
    $: if (selectedShip != prevShip) {
        prevShip = selectedShip;
        if (canvas) canvas.smoothLookAt(selectedShip.symbol)
        getSystem(selectedShip)
    }
    
    // Fetch all Waypoints in the given system
    async function getWaypoints(system: System, page = 1) {
        let wps: Waypoint[] = [];
        let pageSize = 20;
        const res = (await api.systems.getSystemWaypoints(system.symbol, page, pageSize)).data;
        wps = wps.concat(res)
        if (res.length == pageSize) {
            const more = (await getWaypoints(system , page+1));
            wps = wps.concat(more)
        }
        return wps;
    }
    
    // Various things you can tell your ships to do
    async function navigateShip(ship: Ship, toWaypoint: SystemWaypoint) {
        const res = await api.fleet.navigateShip(ship.symbol, {waypointSymbol: toWaypoint.symbol})
        selectedShip = Object.assign(selectedShip, res.data)
    }
</script>

{#each $windows as window (window.uuid)}
    <Window title={window.title} on:close={() => windows.remove(window)}>
        <svelte:component this={window.component} {...window.props} />
    </Window>
{/each}

<UiContainer>
    <TopNavbar />
    <ShipSelector
        bind:selectedShip
        ships={ships}
    />
</UiContainer>

<ThreeCanvas bind:this={canvas}>
    {#if system}
        <ThreeSystem system={system}>
            <ThreeSun meshParamenters={{color: 0xffff00, emissive: 0xffff00}}/>
            {#each system.waypoints as waypoint (waypoint.symbol)}
                <ThreeSystemWaypoint
                    systemWaypoint={waypoint}
                    waypoint={waypoints.get(waypoint.symbol)}
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