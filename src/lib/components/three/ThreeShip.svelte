<script lang="ts">
    import * as THREE from "three";
    import { SvelteComponent, createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/components/three/contexts";
    import type { Ship, SystemWaypoint } from "$lib/api-sdk";
    import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
    import { ExtendedMesh } from "./ExtendedMesh";
    import { api } from "$lib/api";
    import { tweened } from "svelte/motion";
    import { notifications } from "$lib/stores";

    export let ship: Ship;
    export let selected = false;

    export let meshParameters: THREE.MeshStandardMaterialParameters = {}
    const dispatch = createEventDispatcher()

    // Get contexts
    const three = getContext<ThreeContext>("three")
    const system = getContext<SystemContext>("system");

    // Create the actual object
    const geometry = new THREE.ConeGeometry(2, 5, 32);
    const material = new THREE.MeshStandardMaterial(meshParameters);
    const mesh = new ExtendedMesh(geometry, material);
    mesh.name = ship.symbol
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const initial = system.system.waypoints.find(wp => wp.symbol == ship.nav.waypointSymbol)
    const x = initial ? initial.x : 0;
    const z = initial ? initial.y : 0;
    mesh.position.set(x, 0, z)
    three.scene.add(mesh)
    
    // Attach event listeners
    mesh.pointerenter.subscribe(_ => {
        dispatch("pointerenter");
    })
    mesh.pointerout.subscribe(_ => {
        dispatch("pointerout");
    })

    // Highlight the currently selected ship
    let outlinePass: OutlinePass;
    $: if (selected) {
        outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), three.scene, three.camera);
        outlinePass.selectedObjects = [mesh];
        outlinePass.edgeThickness = 1
        outlinePass.edgeGlow = 5
        three.effectComposer.addPass(outlinePass)
    } else {
        three.effectComposer.removePass(outlinePass)
    }

    // Navigate to a new waypoint when the ship nav data changes
    let currentWaypoint = system.system.waypoints.find(wp => wp.symbol == ship.nav.waypointSymbol);
    $: if (currentWaypoint && currentWaypoint.symbol != ship.nav.waypointSymbol) {
        currentWaypoint = system.system.waypoints.find(wp => wp.symbol == ship.nav.waypointSymbol);
        if (currentWaypoint) navigateTo(currentWaypoint);
    }
    
    onDestroy(() => {
        geometry.dispose();
        material.dispose();
        three.scene.remove(mesh);
    })

    function millisecondsUntilArrival(arrival: Date) {
        const time = Math.round((arrival.getTime() - new Date().getTime()));        
        return time;
    }

    export async function navigateTo(waypoint: SystemWaypoint) {
        // this.system.threeHelper.drawLine(this.position, waypoint.position)

        const arrival = new Date(ship.nav.route.arrival);
        const duration = millisecondsUntilArrival(arrival)
        notifications.success(`Ship ${ship.symbol} will arrive at ${waypoint.symbol} in ${duration/1000}s`)

        const x = tweened(mesh.position.x, {duration: duration})
        const z = tweened(mesh.position.z, {duration: duration})
        x.subscribe(pos => mesh.position.x = pos)
        z.subscribe(pos => mesh.position.z = pos)
        x.set(waypoint.x)
        z.set(waypoint.y)
        notifications.success(`Started moving ship ${ship.symbol}`)

        setTimeout(() => {
            notifications.success(`Ship ${ship.symbol} succesfully arrived at ${waypoint.symbol}`)
        }, duration);
    }
</script>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>
