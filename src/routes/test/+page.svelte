<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship, System, SystemWaypoint } from "$lib/api-sdk";
    import ShipSelector from "$lib/components/ShipSelector.svelte";
    import ThreeCanvas from "$lib/components/three/ThreeCanvas.svelte";
    import ThreeSun from "$lib/components/three/ThreeSun.svelte";
    import ThreeSystemWaypoint from "$lib/components/three/ThreeSystemWaypoint.svelte";
    import ThreeWaypoint from "$lib/components/three/ThreeSystemWaypoint.svelte";
    import { myAgent } from "$lib/stores";
    import ThreeSystem from "$lib/components/three/ThreeSystem.svelte";
    import { IconNavigationExclamation } from "@tabler/icons-svelte";
    import { onMount } from "svelte";
   
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

<ThreeCanvas>
    {#if system}
        <ThreeSystem system={system}>
            <ThreeSun meshParamenters={{color: 0xffff00}}/>
            {#each system.waypoints as waypoint}
                <ThreeWaypoint systemWaypoint={waypoint}></ThreeWaypoint>
            {/each}
        </ThreeSystem>
        <!-- <Ship bind:this={ship}/> -->
        <!-- Tällee voi sit callaa ship.navigateTo() -->
        <!-- ja Shipin sisäl export function navigateTo(star) -->
    {/if}
</ThreeCanvas>