<script lang="ts">
    import * as THREE from "three";
    import { createEventDispatcher, getContext, onMount } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/components/three/contexts";
    import type { Ship } from "$lib/api-sdk";
    import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
    import { ExtendedMesh } from "./ExtendedMesh";

    export let ship: Ship;
    export let selected = false;

    export let meshParameters: THREE.MeshStandardMaterialParameters = {}
    const dispatch = createEventDispatcher()

    const three = getContext<ThreeContext>("three")
    const system = getContext<SystemContext>("system");
    let mesh: ExtendedMesh;
    
    $: currentWaypoint = system.system.waypoints.find(wp => wp.symbol == ship.nav.waypointSymbol) ?? system.system.waypoints[0];

    // Highlight the currently selected ship
    let outlinePass: OutlinePass;
    $: if (selected && mesh) {
        outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), three.scene, three.camera);
        outlinePass.selectedObjects = [mesh];
        outlinePass.edgeThickness = 1
        outlinePass.edgeGlow = 5
        three.effectComposer.addPass(outlinePass)
    } else {
        three.effectComposer.removePass(outlinePass)
    }
    
    onMount(() => {
        const geometry = new THREE.ConeGeometry(2, 5, 32);
        const material = new THREE.MeshStandardMaterial(meshParameters);
        mesh = new ExtendedMesh(geometry, material);
        mesh.name = ship.symbol
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(currentWaypoint.x, 0, currentWaypoint.y)
        
        // Attach event listeners
        mesh.pointerenter.subscribe(_ => {
            dispatch("pointerenter");
        })
        mesh.pointerout.subscribe(_ => {
            dispatch("pointerout");
        })

        three.scene.add(mesh)
        return () => {
            geometry.dispose();
            material.dispose();
            three.scene.remove(mesh);
        }

    })

</script>
