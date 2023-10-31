<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import { myAgent } from "$lib/stores";

    export let selectedShip: Ship;

</script> 

<div class="position-relative">
    <div class="position-absolute">
       Select ship:
       {#each $myAgent.ships as ship (ship.symbol)}
            <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
            on:click={() => selectedShip = ship}>
                {ship.symbol}
            </button>
       {/each} 
    </div>
</div>