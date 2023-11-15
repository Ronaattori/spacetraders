<script lang="ts">
    import "../app.css"
    import img from '$lib/images/munkki.jpg';
    import { onMount } from 'svelte';
    import { api } from '$lib/api';
    import { notifications, myAgent } from '$lib/stores';
    import { IconCheck, IconChecklist, IconLogin, IconLogout, IconPlus } from '@tabler/icons-svelte';
    import Button from "$lib/components/common/Button.svelte";
    import Navbar from "$lib/components/common/Navbar.svelte";
    import Dropdown from "$lib/components/common/Dropdown.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import ItemList from "$lib/components/common/ItemList.svelte";
    import ListItem from "$lib/components/common/ListItem.svelte";
    import Link from "$lib/components/common/Link.svelte";
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

<div class="flex font-mono">
  <Navbar>
    <div slot="header"> 
      <Card>
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

    <Button class=w-full>
      <Link href="/">Home</Link>
    </Button>
    <Dropdown text="Navigation">
      <ListItem>
        <Link href="/navigation">
          Navigation
        </Link>
      </ListItem>
    </Dropdown>
    <Dropdown text="Shop">
      <ListItem>
        <Link href="/shop">
          Shop
        </Link>
      </ListItem>
    </Dropdown>
    <Dropdown text="Contract">
      <ListItem>
        <Link href="/contract">
          <IconChecklist />
          List
        </Link>
      </ListItem>
    </Dropdown>
    <Dropdown text="User">
      <ListItem>
        <Link href="/user/register">
          <IconPlus />
          Register
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/user/login">
          <IconLogin />
          Login
        </Link>
      </ListItem>
      <ListItem>
        <Link on:click={() => localStorage.removeItem("apiKey")}>
          <IconLogout />
          Logout
        </Link>
      </ListItem>
    </Dropdown>

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