<script lang="ts">
    import "$lib/tailwind.css";
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import type { Agent } from '$lib/api-sdk';
    import { notifications } from '$lib/stores';
    import Notifications from '$lib/components/Notifications.svelte';
    
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

<div class="bg-yellow-700 page h-32 w-32">
  <aside class="">
    <button>
      alöksjd
    </button>
  </aside>
</div>

<div class="page">
  <!-- Sidebar -->
  <aside class="navbar navbar-vertical navbar-expand-sm navbar-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark">
        <a href="/">
          <img src={img} width="110" height="32" alt="Tabler" class="navbar-brand-image">
          Speis treiders
        </a>
      </h1>
      <span>
        Logged in as {username} 
      </span>
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
          <div class="nav-item dropdown p-2 ">
            <a class="btn dropdown-toggle" data-bs-toggle="dropdown">Contract</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/contract">List</a>
            </div>
          </div>
          <div class="nav-item dropdown p-2 ">
            <a class="btn dropdown-toggle" data-bs-toggle="dropdown">User</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/user/register">Register</a>
              <a class="dropdown-item" href="/user/login">Login</a>
              <button class="dropdown-item" on:click={() => localStorage.removeItem("apiKey")}>Logout</button>
            </div>
          </div>
        </li>
        </ul>
        <ul class="card m-3 text-black">
          <div class="card-body">
            <h3 class="card-title">Location:</h3> 
            <p class="text-secondary">Symbol: {myAgent?.headquarters}</p>
            <p class="text-secondary">System: {myAgent?.headquarters.split("-").splice(0, 2).join("-")}</p>
          </div>
        </ul>
      </div>
    </div>
  </aside>
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
</div>
