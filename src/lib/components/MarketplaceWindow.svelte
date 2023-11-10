<script lang="ts">
    import type { Market, ShipType, Shipyard } from "$lib/api-sdk";
    import Table from "./Table.svelte";

    export let marketplace: Market

</script>
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