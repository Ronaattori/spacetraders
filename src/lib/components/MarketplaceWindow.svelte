<script lang="ts">
    import type { Market, ShipType, Shipyard } from "$lib/api-sdk";
    import { tooltip } from "$lib/use";
    import ShipyardShipInfo from "./ShipyardShipInfo.svelte";
    import Table from "./Table.svelte";
    import Window from "$lib/components/Window.svelte";
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";

    export let marketplace: Market

</script>
<Window title="Marketplace">
    <Table columns={["Name", "Buy Price", "Sell Price"]}>
        {#if marketplace.tradeGoods}
            {#each marketplace.tradeGoods as tradeGood}
                <tr>
                    <td>{tradeGood.symbol}</td>
                    <td>{tradeGood.purchasePrice}</td>
                    <td>{tradeGood.sellPrice}</td>
                </tr>
            {/each}
        {:else}
            <tr> <td>Move a ship into the Market to see what's for sale</td> </tr>
        {/if}
    </Table>
</Window>