<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import ItemList from "$lib/components/common/ItemList.svelte";
    import ShipSelectorShip from "./ShipSelectorShip.svelte";

    export let ships: Ship[];
    export let selectedShip: Ship;
</script> 

<ItemList class="gap-2 pointer-events-auto row-start-2 col-span-3">
   {#each ships as ship (ship.symbol)}
        <ShipSelectorShip 
            ship={ship}
            selected={ship == selectedShip}
            on:select={() => selectedShip = ship}
        />
   {/each} 
</ItemList>