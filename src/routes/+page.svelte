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
    import { getContracts, getMyAgent, getMyShips, getSystem, getSystemWaypoints, navigateShip } from "$lib/spaceControls";
    import Button from "$lib/components/common/Button.svelte";
    import ShipCargoWindow from "$lib/components/spacetraders/window/ShipCargoWindow.svelte";
    import ContractsWindow from "$lib/components/spacetraders/window/ContractsWindow.svelte";
    
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
    const onSystemChange = async () => {
        const curSystem = selectedShip.nav.systemSymbol;
        prevSystem = curSystem;
        system = await getSystem(curSystem)
        const wps = await getSystemWaypoints(curSystem)
        wps.map(wp => waypoints.set(wp.symbol, wp));
        waypoints = waypoints;
    }
    $: if (selectedShip?.nav.systemSymbol != prevSystem) onSystemChange()

    // Look at the ship when the selected ship changes
    let prevShip: Ship;
    $: if (selectedShip != prevShip) {
        prevShip = selectedShip;
        if (canvas) canvas.smoothLookAt(selectedShip.symbol)
    }

    // Fetch our first data
    onMount(async () => {
      const res = await getMyAgent();
      const ships = await getMyShips();
      const agentData = {...$myAgent, ...res};
      agentData.ships = ships;
      $myAgent = Object.assign($myAgent, agentData)
    })
    
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
    <Button class="pointer-events-auto col-start-12 row-span-1"
    on:click={async () => windows.add("Contracts", ContractsWindow, {contracts: await getContracts(), canvas})}
    >
       Open contracts
    </Button>
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