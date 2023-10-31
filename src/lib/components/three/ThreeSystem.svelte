<script lang="ts">
    import * as THREE from "three";
    import { setContext } from "svelte";
    import type { SystemContext } from "$lib/components/three/contexts";
    import type { System } from "$lib/api-sdk";

    ///
    /// This component only exists to provide the system context to elements below it
    ///

    export let system: System
    
    setContext<SystemContext>("system", {
        system: system
    });
</script>

<slot/>
