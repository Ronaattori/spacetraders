<script lang="ts">
    import "../app.css"
    import Notifications from "$lib/components/common/Notifications.svelte";
    import { notifications } from "$lib/stores";

</script>

<Notifications notifications={notifications}/>

<slot />