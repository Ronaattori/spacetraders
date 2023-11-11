<script lang="ts">
    import { myAgent } from '$lib/stores';
    import Button from './Button.svelte';
</script> 

<header class="w-full bg-gray-700 h-16 flex items-center text-white p-2 gap-4">
    <Button class="p-2 rounded-lg" color="bg-slate-800">
        Credits: {$myAgent.credits}
    </Button>
    <Button class="p-2 rounded-lg" color="bg-slate-800">
        Galactic bitches: {0}
    </Button>
</header>