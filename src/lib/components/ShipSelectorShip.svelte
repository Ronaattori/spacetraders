<script lang="ts">
    import type { Ship } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { createEventDispatcher } from "svelte";

    export let ship: Ship;
    export let selected: boolean;
    const dispatch = createEventDispatcher();
    
    $: cooldown = ship.cooldown.expiration ? createTimer(new Date(ship.cooldown.expiration)): null

</script> 
<div class="card mb-2">
    <div class="card-body">
    <button class="btn {selected ? "btn-primary" : ""}" 
        on:click={() => dispatch("select", ship)}>
            {ship.symbol}
        </button>
        <div class="mt-2">
            <button class="btn" on:click={() => dispatch("extract", {ship: ship})}>
                Extract resources | CD: {$cooldown ?? "0"}s
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