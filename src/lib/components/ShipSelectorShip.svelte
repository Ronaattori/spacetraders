<script lang="ts">
    import { api } from "$lib/api";
    import { ShipNavStatus, type Ship } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { notifications, windows } from "$lib/stores";
    import { createEventDispatcher } from "svelte";
    import ShipCargoWindow from "./ShipCargoWindow.svelte";
    import Card from "./Card.svelte";
    import Button from "./Button.svelte";
    import ItemList from "./ItemList.svelte";

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
<Card>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <Button class={selected ? "bg-primary" : ""}
            on:click={() => dispatch("select", ship)}>
                Select: {ship.symbol}
            </Button>
            <Button on:click={() => windows.add("Ship inventory", ShipCargoWindow, {ship})}>
                Inventory
            </Button>
        </div>
        <div class="flex gap-2">
            <Button on:click={toggleOrbit}>
                {ship.nav.status}
            </Button>
            <Button on:click={() => dispatch("extract", {ship: ship})}>
                Extract resources | CD: {$cooldown ?? "0"}s
            </Button>
        </div>
        <span> Ship role: {ship.registration.role} </span>
        <span> Current waypoint: {ship.nav.waypointSymbol} </span>
        <ItemList>
            <span>Fuel:
                <progress class="progress" value={ship.fuel.current} max={ship.fuel.capacity} />
            </span>
            <span>Cargo:
                <progress class="progress" value={ship.cargo.units} max={ship.cargo.capacity} />
            </span>
        </ItemList>
    </div>
</Card>