<script lang="ts">
    import type { Ship } from "$lib/api-sdk";

    export let ship: Ship
</script>

<div>
  <p>{ship.symbol}</p>
  <p>Fuel: {ship.fuel.current}/{ship.fuel.capacity}</p>
  <p>{ship.engine.name}</p>
  <p>{ship.nav.status}<p>
</div>