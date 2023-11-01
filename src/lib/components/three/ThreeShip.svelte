<script lang="ts">
    import * as THREE from "three";
    import { SvelteComponent, createEventDispatcher, getContext, onMount } from "svelte";
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

    function millisecondsUntilArrival(arrival: Date) {
        const time = Math.round((arrival.getTime() - new Date().getTime()));        
        return time;
    }

    export async function navigateTo(waypoint: SystemWaypoint) {
        // this.system.threeHelper.drawLine(this.position, waypoint.position)

        const res = await api.fleet.navigateShip(ship.symbol, {waypointSymbol: waypoint.symbol});
        ship = Object.assign(ship, res.data)

        const arrival = new Date(res.data.nav.route.arrival);
        const duration = millisecondsUntilArrival(arrival)
        notifications.success(`Ship ${ship.symbol} will arrive at ${waypoint.symbol} in ${duration/1000}s`)

        const x = tweened(mesh.position.x, {duration: duration})
        const z = tweened(mesh.position.z, {duration: duration})
        x.subscribe(pos => mesh.position.x = pos)
        z.subscribe(pos => mesh.position.z = pos)
        x.set(waypoint.x)
        z.set(waypoint.y)
        setTimeout(() => {
            notifications.success(`Ship ${ship.symbol} succesfully arrived at ${waypoint.symbol}`)
        }, duration);
    }

</script>

<!-- Allow access to passed props from outside this component -->
<svelte:options accessors/>
