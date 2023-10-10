<script lang="ts">
    export let columns:Array<string>;
</script>

<table class="table table-vcenter">
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