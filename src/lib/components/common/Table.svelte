<script lang="ts">
    export let columns: string[];
</script>

<table>
  <thead>
    <tr>
        {#each columns as column}
           <th>{column}</th> 
        {/each}
    </tr>
  </thead>
  <tbody>
    <slot/>
  </tbody>
</table>