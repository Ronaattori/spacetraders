<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import ShipSelectorShip from "./ShipSelectorShip.svelte";

    export let ships: Ship[];
    export let selectedShip: Ship;

</script> 

<div class="flex flex-col gap-2 mt-2 max-w-fit">
   {#each ships as ship (ship.symbol)}
        <ShipSelectorShip 
            ship={ship}
            selected={ship == selectedShip}
            on:select={() => selectedShip = ship}
            on:extract
        />
   {/each} 
</div>