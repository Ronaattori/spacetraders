<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import { myAgent } from "$lib/stores";

    export let selectedShip: Ship;

</script> 

<div class="position-relative">
    <div class="position-absolute p-2">
       {#each $myAgent.ships as ship (ship.symbol)}
            <div class="card mb-2">
                <div class="card-body">
                <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
                    on:click={() => selectedShip = ship}>
                        {ship.symbol}
                    </button>
                    <div class="d-flex flex-column">
                        <span>Fuel:
                            <div class="progress">
                                <progress class="progress" value={ship.fuel.capacity - (ship.fuel.consumed?.amount ?? 0)} max={ship.fuel.capacity} />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
       {/each} 
    </div>
</div>