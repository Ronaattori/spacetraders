<script lang="ts">
    import "../app.css"
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import { notifications, myAgent } from '$lib/stores';
    import Notifications from '$lib/components/Notifications.svelte';
    import Navbar from "$lib/components/Navbar.svelte";
    import Dropdown from '$lib/components/Dropdown.svelte';
    import { IconCheck, IconChecklist, IconLogin, IconLogout, IconPlus } from '@tabler/icons-svelte';
    import Card from "$lib/components/Card.svelte";
    import NavbarItems from "$lib/components/ItemList.svelte";
    import ItemList from "$lib/components/ItemList.svelte";
    import Button from "$lib/components/Button.svelte";
    
    onMount(async () => {
      const res = await api.agents.getMyAgent();
      const agentData = {...$myAgent, ...res.data};
      const ships = (await api.fleet.getMyShips()).data;
      agentData.ships = ships;
      $myAgent = Object.assign($myAgent, agentData)
    })
</script>

<Notifications notifications={notifications}/>

<div class="flex">
  <Navbar>
    <div slot="header"> 
      <Card class="bg-white">
        <h1 slot="header" class="navbar-brand navbar-brand-autodark text-dark">
          <a href="/">
            <img src={img} width="110" height="32" alt="Tabler">
          </a>
          Speis treiders
        </h1>
        <span>
          {$myAgent.symbol ? `Logged in as ${$myAgent.symbol}` : "Not logged in..."}
        </span>
      </Card>
    </div>
    <ItemList>
        <li>
          <Button>
            <a href="/">Home</a>
          </Button>
        </li>
        <li>
          <Dropdown text="Navigation">
            <Button>
              <a href="/navigation">
                Navigation
              </a>
            </Button>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="Shop">
            <a href="/shop">
              Shop
            </a>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="Contract">
            <a href="/contract">
              <IconChecklist />
              List
            </a>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="User">
            <a href="/user/register" class="flex">
              <IconPlus />
              Register
            </a>
            <a href="/user/login" class="flex">
              <IconLogin />
              Login
            </a>
            <a href="#top" class="flex" on:click={() => localStorage.removeItem("apiKey")}>
              <IconLogout />
              Logout
            </a>
          </Dropdown>
        </li>
    </ItemList>
    <div slot="footer">
      <Card>
          Accepted Contracts: {$myAgent.acceptedContracts.length}
      </Card>
    </div>
  </Navbar>
  <slot />
</div>
<!-- <div class="page-wrapper">
  <slot />
</div> -->