<script lang="ts">
    import { myAgent } from '$lib/stores';
    import Button from './Button.svelte';
    import munkki from '$lib/images/munkki.jpg'
</script> 

<header class="w-full bg-gray-700 h-16 flex items-center text-white p-2 gap-4">
    <img src={munkki} alt="munkki" class="h-full w-64">
    <Button class="bg-slate-800 p-2 rounded-lg">
        Credits: {$myAgent.credits}
    </Button>
    <Button class="bg-slate-800 p-2 rounded-lg">
        Galactic bitches: {0}
    </Button>
</header>