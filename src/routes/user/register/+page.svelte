<script lang="ts">
    import { enhance } from "$app/forms";
    import { FactionSymbol } from "$lib/api-sdk";
    import Button from "$lib/components/common/Button.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Input from "$lib/components/common/Input.svelte";
    import ItemList from "$lib/components/common/ItemList.svelte";

    let selectedFaction = FactionSymbol.COSMIC;
</script>

<div class="bg-secondary w-screen h-screen flex justify-center items-center">
    <Card>
      <h2>Register an Agent</h2>
      <form method="POST" action="/user?/register" use:enhance>
        <ItemList>
          <select name="faction" class="form-select" bind:value={selectedFaction}>
            {#each Object.entries(FactionSymbol) as [k, v]}
              <option value={v}>{k}</option>
            {/each}
          </select>
          <Input name="symbol" maxlength={14} required placeholder="Agent name"/>
          <Button>
            Submit
          </Button>
        </ItemList>
      </form>
    </Card>
</div>
