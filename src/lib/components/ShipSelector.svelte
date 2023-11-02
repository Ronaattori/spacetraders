<script lang="ts">
    import { api } from "$lib/api";
    import type { Ship } from "$lib/api-sdk";

    export let ships: Ship[];
    export let selectedShip: Ship;
    
    async function extractResources(ship: Ship) {
        const res = await api.fleet.extractResources(ship.symbol);
        ship.cooldown = res.data.cooldown
        ship.cargo = res.data.cargo
        console.log(res.data.extraction)
    }
    
</script> 

<div class="position-relative">
    <div class="position-absolute p-2">
       {#each ships as ship (ship.symbol)}
            <div class="card mb-2">
                <div class="card-body">
                <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
                    on:click={() => selectedShip = ship}>
                        {ship.symbol}
                    </button>
                    <div class="mt-2">
                        <button class="btn" on:click={() => extractResources(ship)}>
                            Extract resources
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <span>Fuel:
                            <progress class="progress" value={ship.fuel.current} max={ship.fuel.capacity} />
                        </span>
                        <span>Cargo:
                            <progress class="progress" value={ship.cargo.units} max={ship.cargo.capacity} />
                        </span>
                    </div>
                </div>
            </div>
       {/each} 
    </div>
</div>