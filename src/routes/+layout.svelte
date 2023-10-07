<script lang="ts">
    import "$lib/tailwind.css";
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Agent } from '$lib/api-sdk';
    import { notifications } from '$lib/stores';
    import Notifications from '$lib/components/Notifications.svelte';
    import Navbar from "$lib/components/Navbar.svelte";
    import { IconListDetails, IconLogin, IconLogout, IconRegistered, IconSpace } from "@tabler/icons-svelte";
    import Navbutton from "$lib/components/Navbutton.svelte";
    
    let myAgent: Agent;
    let location;
    $: username = myAgent?.symbol ?? "Loading...";
    $: curMoney = myAgent?.credits ?? 0;
    
    onMount(async () => {
      myAgent = (await $api.agents.getMyAgent()).data;
      const coords = myAgent.headquarters.split("-");
      const system = coords.slice(0, 2).join("-");
      const waypoint = coords.slice(0, 3).join("-");
      location = (await $api.systems.getWaypoint(system, waypoint))
    })
</script>

<Notifications notifications={notifications}/>

<div class="page">
  <Navbar>
      <div>
        <h1>Speis treiders</h1> 
        <img src={img} class="p-2" alt="Munkki">
      </div>
      <Navbutton href="/contract" icon={IconListDetails}>
        <span>Contracts</span>
      </Navbutton>
      <Navbutton href="/user/login" icon={IconLogin}>
        <span>Login</span>
      </Navbutton>
      <Navbutton href="/user/register" icon={IconRegistered}>
        <span>Register</span>
      </Navbutton>
      <Navbutton href="/user/login" on:click={() => localStorage.removeItem("apiKey")} icon={IconLogout}>
        <span>Logoff</span>
      </Navbutton>
  </Navbar>
  <div class="pl-24">
    <nav class="navbar bg-slate-200 flex divide-y">
      <span>Money: {curMoney}</span>
      <div class="divider divider-horizontal"/>
      <span>Galactic bithces: 0</span>
    </nav>
    <slot/>
  </div>
</div>