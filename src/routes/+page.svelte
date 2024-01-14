<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship, System, SystemWaypoint, Waypoint } from "$lib/api-sdk";
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
    
    // Different parts of the state
    $: ships = $myAgent.ships;
    let selectedShip: Ship;
    let system: System;
    $: shipsInSystem = (selectedShip && system) ? ships.filter(ship => ship.nav.systemSymbol == system.symbol) : [];
    let waypoints: Map<string, Waypoint> = new Map();

    // Select the first ship if nothing else is specified
    const selectFirstShip = () => selectedShip = ships[0];
    $: if (ships.length > 0 && !selectedShip) selectFirstShip()
    
    // Fetch the System and Waypoints when the system changes
    let prevSystem: string;
    const getCurrentSystem = async () => {
        notifications.info("Starting to fetch system info...")
        const curSystem = selectedShip.nav.systemSymbol;
        prevSystem = curSystem;
        system = (await api.systems.getSystem({systemSymbol: curSystem})).data;
        const wps = await api.getAll(api.systems.getSystemWaypoints, api.systems, {systemSymbol: system.symbol})
        wps.map(wp => waypoints.set(wp.symbol, wp));
        waypoints = waypoints;
        notifications.success("System info fetching done!")
    }
    $: if (selectedShip?.nav.systemSymbol != prevSystem) getCurrentSystem()

    // Look at the ship when the selected ship changes
    let prevShip: Ship;
    $: if (selectedShip != prevShip) {
        prevShip = selectedShip;
        if (canvas) canvas.smoothLookAt(selectedShip.symbol)
    }

    // Fetch our first data
    onMount(async () => {
      const res = (await api.agents.getMyAgent()).data;
      const ships = (await api.fleet.getMyShips({})).data;
      const agentData = {...$myAgent, ...res};
      agentData.ships = ships;
      $myAgent = Object.assign($myAgent, agentData)
      
    })
    
    // Various things you can tell your ships to do
    async function navigateShip(ship: Ship, toWaypoint: SystemWaypoint) {
        const res = await api.fleet.navigateShip({shipSymbol: ship.symbol, requestBody: {waypointSymbol: toWaypoint.symbol}})
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
        {ships}
    />
</UiContainer>

<ThreeCanvas bind:this={canvas}>
    {#if system}
        <ThreeSystem {system}>
            <ThreeSun meshParamenters={{color: 0xffff00, emissive: 0xffff00}}/>
            {#each system.waypoints as systemWaypoint (systemWaypoint.symbol)}
                <ThreeSystemWaypoint
                    {systemWaypoint}
                    waypoint={waypoints.get(systemWaypoint.symbol)}
                    on:click={() => navigateShip(selectedShip, systemWaypoint)}
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