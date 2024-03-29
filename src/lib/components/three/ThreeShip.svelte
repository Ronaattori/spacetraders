<script lang="ts">
    import * as THREE from "three";
    import { SvelteComponent, createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/three/contexts";
    import { ShipNavStatus, type Ship, type SystemWaypoint } from "$lib/api-sdk";
    import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
    import { ExtendedMesh } from "$lib/three/ExtendedMesh";
    import { api } from "$lib/api";
    import { tweened } from "svelte/motion";
    import { notifications } from "$lib/stores";
    import { millisecondsUntilDate } from "$lib/lib";

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
    const mesh = new ExtendedMesh(geometry, material, three);
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
    $: mesh.glow.set(selected ? 4 : null)

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


    export async function navigateTo(waypoint: SystemWaypoint) {
        const duration = millisecondsUntilDate(new Date(ship.nav.route.arrival))
        notifications.success(`Ship ${ship.symbol} will arrive at ${waypoint.symbol} in ${duration/1000}s`)
        const destination = new THREE.Vector3(waypoint.x, mesh.position.y, waypoint.y);

        // Draw a line to the destination
        const lineMaterial = new THREE.LineDashedMaterial()
        const lineGeometry = new THREE.BufferGeometry()
        const line = new THREE.Line(lineGeometry, lineMaterial);
        three.scene.add(line)

        const pos = tweened(mesh.position, {duration});
        pos.subscribe(pos => {
            line.geometry.setFromPoints([
                mesh.position,
                destination,
            ])
            mesh.position.copy(pos)
        }) 
        pos.set(destination)
        notifications.success(`Started moving ship ${ship.symbol}`)

        setTimeout(() => {
            ship.nav.status = ShipNavStatus.IN_ORBIT;
            three.scene.remove(line);
            notifications.success(`Ship ${ship.symbol} succesfully arrived at ${waypoint.symbol}`)
        }, duration);
    }
</script>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>
