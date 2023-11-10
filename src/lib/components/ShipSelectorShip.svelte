<script lang="ts">
    import { api } from "$lib/api";
    import { ShipNavStatus, type Ship } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { notifications, windows } from "$lib/stores";
    import { createEventDispatcher } from "svelte";
    import ShipCargoWindow from "./ShipCargoWindow.svelte";

    export let ship: Ship;
    export let selected: boolean;
    const dispatch = createEventDispatcher();
    
    $: cooldown = ship.cooldown.expiration ? createTimer(new Date(ship.cooldown.expiration)): null
    
    async function toggleOrbit() {
        if (ship.nav.status == ShipNavStatus.DOCKED) {
            const res = await api.fleet.orbitShip(ship.symbol);
            notifications.success(`Ship ${ship.symbol} succesfully sent to orbit`)
            ship = Object.assign(ship, res.data)
        } else {
            const res = await api.fleet.dockShip(ship.symbol);
            notifications.success(`Ship ${ship.symbol} succesfully docked`)
            ship = Object.assign(ship, res.data)
        }
    }

</script> 
<div class="card mb-2">
    <div class="card-body d-flex flex-column gap-2">
        <div class="d-flex gap-2">
            <button class="btn {selected ? "btn-primary" : ""}" 
            on:click={() => dispatch("select", ship)}>
                Select: {ship.symbol}
            </button>
            <button class="btn" on:click={() => windows.add("Ship inventory", ShipCargoWindow, {ship})}>
                Inventory
            </button>
        </div>
        <div class="d-flex gap-2">
            <div>
                <button class="btn" on:click={toggleOrbit} >
                    {ship.nav.status}
                </button>
            </div>
            <div>
                <button class="btn" on:click={() => dispatch("extract", {ship: ship})}>
                    Extract resources | CD: {$cooldown ?? "0"}s
                </button>
            </div>
        </div>
        <span> Ship role: {ship.registration.role} </span>
        <span> Current waypoint: {ship.nav.waypointSymbol} </span>
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