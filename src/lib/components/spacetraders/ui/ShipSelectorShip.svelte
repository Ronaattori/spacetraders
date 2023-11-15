<script lang="ts">
    import { api } from "$lib/api";
    import { ShipNavStatus, type Ship } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { myAgent, notifications, windows } from "$lib/stores";
    import { createEventDispatcher } from "svelte";
    import { tooltip } from "$lib/use";
    import ShipCargoWindow from "../window/ShipCargoWindow.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import ItemList from "$lib/components/common/ItemList.svelte";

    export let ship: Ship;
    export let selected: boolean;
    
    let autoExtractEnabled = false;
    const dispatch = createEventDispatcher();
    
    $: cooldown = ship.cooldown.expiration ? createTimer(new Date(ship.cooldown.expiration)): null

    $: arrivingAt = new Date(ship.nav.route.arrival)
    $: arrival = arrivingAt > new Date() ? createTimer(arrivingAt): null
    
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
    async function extract() {
        const res = await api.fleet.extractResources(ship.symbol);
        ship.cooldown = res.data.cooldown
        ship.cargo = res.data.cargo
        $myAgent.ships = $myAgent.ships;
        return res;
    }
    
    $: if (autoExtractEnabled) autoExtract()
    async function autoExtract() {
        try {
            const res = await extract()
            setTimeout(() => {
                if (autoExtractEnabled) autoExtract()               
            }, (res.data.cooldown.remainingSeconds + 1) * 1000);
        } catch {
            autoExtractEnabled = false;
        }
    }

</script> 
<Card class="bg-secondary">
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <Button class={selected ? "bg-primary" : "bg-white"}
            on:click={() => dispatch("select", ship)}>
                Select: {ship.symbol}
            </Button>
            <Button on:click={() => windows.add("Ship inventory", ShipCargoWindow, {ship})}>
                Inventory
            </Button>
        </div>
        <div class="flex gap-2">
            <Button on:click={toggleOrbit}>
                {ship.nav.status} {$arrival ? ` | ${$arrival}s` : ""}
            </Button>
            <Button 
            class={autoExtractEnabled ? "bg-highlight" : "bg-white"}
            tooltip={"Right click to enable auto-extract"}
            on:contextmenu={() => autoExtractEnabled = !autoExtractEnabled}
            on:click={extract}>
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