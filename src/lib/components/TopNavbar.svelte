<script lang="ts">
    import { myAgent } from '$lib/stores';
</script> 

<header class="navbar navbar-light w-100">
    <div class="container-xl">
        <div>
            <span>Credits: {$myAgent.credits}</span>
            <span class="border mx-2"/>
            <span>Galactic bitches: {0}</span>
        </div>
    </div>
</header>