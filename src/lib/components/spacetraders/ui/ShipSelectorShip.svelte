<script lang="ts">
    import { api } from "$lib/api";
    import { ShipNavStatus, type Ship, ShipNavFlightMode } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { myAgent, notifications, windows } from "$lib/stores";
    import { createEventDispatcher } from "svelte";
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
    async function setFlightMode(mode: ShipNavFlightMode) {
        const res = await api.fleet.patchShipNav(ship.symbol, {
            flightMode: mode
        });
        ship.nav = Object.assign(ship.nav, res.data)
        notifications.success(`${ship.symbol} flight mode set to ${mode}`)
    }
    async function refuel() {
        const res = await api.fleet.refuelShip(ship.symbol)
        ship.fuel = res.data.fuel;
        $myAgent = Object.assign($myAgent, res.data.agent)
        notifications.success(`${ship.symbol} refueled`)
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
<Card class="backdrop-blur-md bg-background/80 shadow-lg text-white {selected ? 'border-2 border-highlight' : ''}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex gap-2 cursor-pointer pointer-events-auto" on:click={() => dispatch("select", ship)}>
        <div class="flex flex-col">
            <div class="flex gap-2">
                <ItemList>
                    <span>{ship.symbol}</span>
                    <span>{ship.registration.role}</span>
                </ItemList>
                <ItemList>
                    <span>F:
                        <progress class="rounded-sm" value={ship.fuel.current} max={ship.fuel.capacity} />
                    </span>
                    <span>C:
                        <progress class="rounded-sm" value={ship.cargo.units} max={ship.cargo.capacity} />
                    </span>
                </ItemList>
            </div>
            <div class="flex items-center h-full gap-2 m-1">
                <Button class="bg-secondary" on:click={() => windows.add("Ship inventory", ShipCargoWindow, {ship})}>
                    Inventory
                </Button>
                <div class="flex gap-2">
                    <Button 
                    class={autoExtractEnabled ? "bg-highlight" : "bg-secondary"}
                    useTooltip={"Right click to enable auto-extract"}
                    on:contextmenu={() => autoExtractEnabled = !autoExtractEnabled}
                    on:click={extract}>
                        Extract resources | CD: {$cooldown ?? "0"}s
                    </Button>
                </div>
            </div>
        </div> 
        <ItemList>
            <span>{ship.nav.waypointSymbol}</span>
            <Button on:click={toggleOrbit} on:contextmenu={refuel} class="bg-secondary"
            useTooltip={"Right click to refuel ship"}
            >
                {ship.nav.status} {$arrival ? ` | ${$arrival}s` : ""}
            </Button>
            <select class="bg-secondary">
                {#each Object.entries(ShipNavFlightMode) as [k, v]}
                  <option 
                  value={v}
                  selected={ship.nav.flightMode == v}
                  on:click={() => setFlightMode(v)}
                  >
                    {k}
                </option>
                {/each}
            </select>
        </ItemList>
    </div>
</Card>