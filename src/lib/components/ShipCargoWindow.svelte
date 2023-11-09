<script lang="ts">
    import type { Ship, ShipType, Shipyard } from "$lib/api-sdk";
    import Table from "./Table.svelte";
    import Window from "$lib/components/Window.svelte";

    export let ship: Ship
    
</script>
<Window title="Ship cargo">
    <Table columns={["Name", "Units"]}>
        {#each ship.cargo.inventory as item}
            <tr>
                <td>{item.symbol}</td>
                <td>{item.units}</td>
            </tr>
        {/each}
    </Table>
</Window>