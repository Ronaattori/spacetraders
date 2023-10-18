<script lang="ts">
    import type { ShipyardShip } from "$lib/api-sdk";

    export let ship: ShipyardShip
</script>

<div>
  <p>{ship.name}</p>
  <p>Price: {ship.purchasePrice}</p>
  <p>{ship.engine.name}</p>
</div>