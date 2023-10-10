<script lang="ts">
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Agent } from '$lib/api-sdk';
    import { notifications } from '$lib/stores';
    import Notifications from '$lib/components/Notifications.svelte';
    import Navbar from "$lib/components/Navbar.svelte";
    import { IconListDetails, IconLogin, IconLogout, IconRegistered, IconSpace } from "@tabler/icons-svelte";
    import Navbutton from "$lib/components/Navbutton.svelte";
    import Dropdown from '$lib/components/Dropdown.svelte';
    
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

<Navbar>
  <div slot="header" class="card text-dark m-2"> 
    <div class="card-header">
      <h1 class="navbar-brand navbar-brand-autodark text-dark">
        <a href="/">
          <img src={img} width="110" height="32" alt="Tabler">
        </a>
        Speis treiders
      </h1>
    </div>
    <span class="card-body">
      Logged in as {username} 
    </span>
  </div>
  <div class="collapse navbar-collapse" id="sidebar-menu">
    <ul class="navbar-nav pt-lg-3">
      <li class="nav-item">
        <a class="nav-link" href="/">
          <span class="nav-link-title">
            Home
          </span>
        </a>
      </li>
      <li>
        <Dropdown text="Contract">
          <a href="/contract">List</a>
        </Dropdown>
        <Dropdown text="User">
          <a href="/user/register">Register</a>
          <a href="/user/login">Login</a>
          <button on:click={() => localStorage.removeItem("apiKey")}>Logout</button>
        </Dropdown>
      </li>
    </ul>
    <ul class="card m-3 text-black">
      <div class="card-body">
        Contracts:...
      </div>
    </ul>
  </div>
</Navbar>
  <div class="page-wrapper">
    <header class="navbar navbar-light">
      <div class="container-xl">
        <div>
          <span>Money: {curMoney}</span>
          <span class="border mx-2"/>
          <span>Galactic bitches: {0}</span>
        </div>
      </div>
    </header>
    <slot/>
  </div>