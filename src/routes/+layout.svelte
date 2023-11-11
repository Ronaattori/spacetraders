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
    import Link from "$lib/components/Link.svelte";
    
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
        <h1 slot="header">
          <Link href="/">
            <img src={img} width="110" height="32" alt="Home">
          </Link>
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
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Dropdown text="Navigation">
            <Button>
              <Link href="/navigation">
                Navigation
              </Link>
            </Button>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="Shop">
            <Link href="/shop">
              Shop
            </Link>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="Contract">
            <Link href="/contract">
              <IconChecklist />
              List
            </Link>
          </Dropdown>
        </li>
        <li>
          <Dropdown text="User">
            <Link href="/user/register">
              <IconPlus />
              Register
            </Link>
            <Link href="/user/login">
              <IconLogin />
              Login
            </Link>
            <Link on:click={() => localStorage.removeItem("apiKey")}>
              <IconLogout />
              Logout
            </Link>
          </Dropdown>
        </li>
    </ItemList>
    <div slot="footer">
      <Card>
          Accepted Contracts: {$myAgent.acceptedContracts.length}
      </Card>
    </div>
  </Navbar>

  <!-- TODO: Remove this div and offset UI elements to make Three render under the navbar -->
  <div>
    <slot />
  </div>
</div>