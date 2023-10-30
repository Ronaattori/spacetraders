<script lang="ts">
    import type { Waypoint } from "$lib/api-sdk";

    export let waypoint: Waypoint
    
</script>

<div>
  <p>Symbol: {waypoint.symbol}</p>
  <p>Traits: {JSON.stringify(waypoint.traits.map(x => x.name))}</p>
</div>