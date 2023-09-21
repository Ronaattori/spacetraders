<script lang="ts">
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api, setApiKey } from '$lib/api';
    import { goto } from '$app/navigation';
    
    $: curMoney = 0;
    let username = "Loading...";

    onMount(async () => {
      if (!$api) {
        const ls = localStorage.getItem("apiKey");
        if (ls) {
          setApiKey(ls);
        } else {
          goto("/user/login");
          return
        }
      }
      username = (await $api.agents.getMyAgent()).data.data.symbol;
    })
</script>

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
