<script lang="ts">
    import { type Ship, ShipNavFlightMode } from "$lib/api-sdk";
    import { createTimer } from "$lib/lib";
    import { createEventDispatcher } from "svelte";
    import ShipCargoWindow from "../window/ShipCargoWindow.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import ItemList from "$lib/components/common/ItemList.svelte";
    import { slide } from "svelte/transition";
    import { extractResources, refuelShip, pathShipNav, toggleShipOrbit } from "$lib/spaceControls";
    import { windows } from "$lib/stores";

    export let ship: Ship;
    export let selected: boolean;
    
    let autoExtractEnabled = false;
    let showPage1 = true;
    const dispatch = createEventDispatcher();
    
    $: cooldown = ship.cooldown.expiration ? createTimer(new Date(ship.cooldown.expiration)): null

    $: arrivingAt = new Date(ship.nav.route.arrival)
    $: arrival = arrivingAt > new Date() ? createTimer(arrivingAt): null
    
    $: if (autoExtractEnabled) autoExtract()
    async function autoExtract() {
        try {
            const res = await extractResources(ship)
            setTimeout(() => {
                if (autoExtractEnabled) autoExtract()               
            }, (res.cooldown.remainingSeconds + 1) * 1000);
        } catch {
            autoExtractEnabled = false;
        }
    }

</script> 
<Card class="backdrop-blur-md bg-background/80 shadow-lg text-white w-full {selected ? 'border-2 border-highlight' : ''}">
    <div class="grid grid-cols-12 transition-height {showPage1 ? 'h-16 overflow-hidden' : 'h-36'}">
        <div class="bg-secondary col-span-12 col-start-1 row-start-1 flex"
        on:pointerenter={() => showPage1 = false}
        on:pointerleave={() => showPage1 = true}
        >
            <div class="flex flex-col">
                <div class="flex items-center h-full gap-2 m-1">
                    <Button class="bg-secondary"
                    on:click={() => windows.add("Ship inventory", ShipCargoWindow, {ship})}
                    >
                        Inventory
                    </Button>
                    <Button class={autoExtractEnabled ? "bg-highlight" : "bg-secondary"}
                    useTooltip={"Right click to enable auto-extract"}
                    on:contextmenu={() => autoExtractEnabled = !autoExtractEnabled}
                    on:click={() => extractResources(ship)}>
                        Extract resources | CD: {$cooldown ?? "0"}s
                    </Button>
                </div>
            </div> 
            <ItemList>
                <span>{ship.nav.waypointSymbol}</span>
                <Button class="bg-secondary"
                on:click={() => toggleShipOrbit(ship)}
                on:contextmenu={() => refuelShip(ship)}
                useTooltip={"Right click to refuel ship"}
                >
                    {ship.nav.status} {$arrival ? ` | ${$arrival}s` : ""}
                </Button>
                <select class="bg-secondary">
                    {#each Object.entries(ShipNavFlightMode) as [k, v]}
                      <option 
                      value={v}
                      selected={ship.nav.flightMode == v}
                      on:click={() => pathShipNav(ship, v)}
                      >
                        {k}
                    </option>
                    {/each}
                </select>
            </ItemList>
        </div>
        {#if showPage1}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex gap-2 cursor-pointer pointer-events-auto col-start-1 col-span-11 row-start-1 bg-background"
        on:click={() => dispatch("select", ship)}
        transition:slide={{axis: "x"}}
        >
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
            <ItemList>
                <span>{ship.nav.waypointSymbol}</span>
                <span>
                    {ship.nav.status} {$arrival ? ` | ${$arrival}s` : ""}
                </span>
            </ItemList>
        </div>
        {/if}
    </div>
</Card>