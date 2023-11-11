<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import ShipSelectorShip from "./ShipSelectorShip.svelte";

    export let ships: Ship[];
    export let selectedShip: Ship;

</script> 

<div class="d-flex flex-column gap-2 mt-2" style="max-width: fit-content;">
   {#each ships as ship (ship.symbol)}
        <ShipSelectorShip 
            ship={ship}
            selected={ship == selectedShip}
            on:select={() => selectedShip = ship}
            on:extract
        />
   {/each} 
</div>