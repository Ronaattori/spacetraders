<script lang="ts">
    import "../app.css"
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import { notifications, myAgent } from '$lib/stores';
    import Notifications from "$lib/components/common/Notifications.svelte";
    
    onMount(async () => {
      const res = await api.agents.getMyAgent();
      const agentData = {...$myAgent, ...res.data};
      const ships = (await api.fleet.getMyShips()).data;
      agentData.ships = ships;
      $myAgent = Object.assign($myAgent, agentData)
    })
</script>

<Notifications notifications={notifications}/>

<slot />