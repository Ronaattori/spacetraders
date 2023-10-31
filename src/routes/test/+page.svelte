<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship, System } from "$lib/api-sdk";
    import ShipSelector from "$lib/components/ShipSelector.svelte";
    import Canvas from "$lib/components/three/Canvas.svelte";
    import Sun from "$lib/components/three/Sun.svelte";
    import SystemWaypoint from "$lib/components/three/SystemWaypoint.svelte";
    import Waypoint from "$lib/components/three/SystemWaypoint.svelte";
    import { myAgent } from "$lib/stores";
    import { IconNavigationExclamation } from "@tabler/icons-svelte";
    import { onMount } from "svelte";
    import { Vector3 } from "three";
   
   let selectedShip: Ship;
   let system: System;

    // Auto select the first ship if its available and we have nothing else picked
    $: ($myAgent.ships.length > 0 && selectedShip == undefined) && (selectedShip = $myAgent.ships[0]);

    $: if (selectedShip) {
        api.systems.getSystem(selectedShip.nav.systemSymbol).then(res => {
            system = res.data;
        });
    }

    onMount(async () => {
    })

</script>


<ShipSelector bind:selectedShip/>

<Canvas>
    {#if system}
        <Sun meshParamenters={{color: 0xffff00}}/>
        {#each system.waypoints as waypoint}
            <SystemWaypoint SystemWaypoint={waypoint}/> 
        {/each}
        <!-- <Ship bind:this={ship}/> -->
        <!-- Tällee voi sit callaa ship.navigateTo() -->
        <!-- ja Shipin sisäl export function navigateTo(star) -->
    {/if}
</Canvas>