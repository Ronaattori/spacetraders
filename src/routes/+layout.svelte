<script lang="ts">
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import { notifications, myAgent } from '$lib/stores';
    import Notifications from '$lib/components/Notifications.svelte';
    import Navbar from "$lib/components/Navbar.svelte";
    import Dropdown from '$lib/components/Dropdown.svelte';
    
    onMount(async () => {
      const res = await $api.agents.getMyAgent();
      $myAgent = {...$myAgent, ...res.data};
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
      {$myAgent.symbol ? `Logged in as ${$myAgent.symbol}` : "Not logged in..."}
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
        <div>
          {#each $myAgent.acceptedContracts as contract}
            <span>{contract.terms.deadline}</span> 
          {/each}
        </div>
      </div>
    </ul>
  </div>
</Navbar>
  <div class="page-wrapper">
    <header class="navbar navbar-light">
      <div class="container-xl">
        <div>
          <span>Credits: {$myAgent.credits}</span>
          <span class="border mx-2"/>
          <span>Galactic bitches: {0}</span>
        </div>
      </div>
    </header>
    <slot/>
  </div>