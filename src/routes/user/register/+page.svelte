<script lang="ts">
    import { DefaultApi, FactionSymbols } from '$lib/spacetraders-sdk';

    let selectedFaction: FactionSymbols = "COSMIC";
    let username: string;
    let apiKey: string = "";

    async function register() {
        const api = new DefaultApi();
        const res = await api.register({
          faction: selectedFaction,
          symbol: username,
        })
        apiKey = res.data.data.token;
        localStorage.setItem("apiKey", apiKey);
    }
</script>


<h2>Register agent</h2>
<form class="p-2" on:submit={register}>
    <div class="mb-3">
        <label class="form-label" for="faction">Faction:</label>
        <select id="faction" class="form-select">
          {#each Object.entries(FactionSymbols) as [k, v]}
            <option on:select={() => selectedFaction = v}>{k}</option>
          {/each}
        </select>
        <label class="form-label" for="username">Username</label>
        <input id="username" type="text" class="form-control" placeholder="Agent username" maxlength=14 bind:value={username} />
        <button class="btn btn-success m-2">Submit</button>
    </div>
</form>
<h3>
  Api key: {apiKey}
</h3>