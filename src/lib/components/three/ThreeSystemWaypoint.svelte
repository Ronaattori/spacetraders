<script context="module" lang="ts">
    const textures: Map<WaypointType, THREE.Texture | string> = new Map([
        [WaypointType.PLANET, '/src/lib/images/moon.jpg'],
        [WaypointType.GAS_GIANT, '/src/lib/images/moon.jpg'],
        [WaypointType.MOON, '/src/lib/images/moon.jpg'],
        [WaypointType.ORBITAL_STATION, '/src/lib/images/moon.jpg'],
        [WaypointType.JUMP_GATE, '/src/lib/images/moon.jpg'],
        [WaypointType.ASTEROID_FIELD, '/src/lib/images/moon.jpg'],
        [WaypointType.ASTEROID, '/src/lib/images/moon.jpg'],
        [WaypointType.ENGINEERED_ASTEROID, '/src/lib/images/moon.jpg'],
        [WaypointType.ASTEROID_BASE, '/src/lib/images/moon.jpg'],
        [WaypointType.NEBULA, '/src/lib/images/moon.jpg'],
        [WaypointType.DEBRIS_FIELD, '/src/lib/images/moon.jpg'],
        [WaypointType.GRAVITY_WELL, '/src/lib/images/moon.jpg'],
        [WaypointType.ARTIFICIAL_GRAVITY_WELL, '/src/lib/images/moon.jpg'],
        [WaypointType.FUEL_STATION, '/src/lib/images/moon.jpg'],
    ]);
</script>
<script lang="ts">
    import * as THREE from "three";
    import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/three/contexts";
    import { WaypointType, type SystemWaypoint } from "$lib/api-sdk";
    import { randFloat, randInt } from "three/src/math/MathUtils";
    import { ExtendedMesh } from "$lib/three/ExtendedMesh";
    import type { Writable } from "svelte/store";

    export let systemWaypoint: SystemWaypoint; 

    export let radius = 1.5;
    export let meshParameters: THREE.MeshStandardMaterialParameters = {}
    const dispatch = createEventDispatcher()
    
    // Component specific reactive values
    let orbit = true;

    // Get contexts
    const three = getContext<ThreeContext>("three")
    const system = getContext<SystemContext>("system");
    
    // Create the actual object
    const type = systemWaypoint.type;
    let texture = textures.get(type)
    if (typeof texture == "string") {
        texture = three.textureLoader.load(texture);
        textures.set(type, texture)
    }
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    const material = new THREE.MeshStandardMaterial({...meshParameters, map: texture});
    const mesh = new ExtendedMesh(geometry, material, three)
    mesh.name = systemWaypoint.symbol
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Set the position and possibly make it orbit around that point
    mesh.position.set(systemWaypoint.x, 0, systemWaypoint.y)
    if (systemWaypoint.orbits) addOrbit();
    three.scene.add(mesh)
        
    // Attach event listeners
    mesh.pointerenter.subscribe(_ => {
        dispatch("pointerenter");
        mesh.glow.set(1)
        orbit = false;
    })
    mesh.pointerout.subscribe(_ => {
        dispatch("pointerout");
        mesh.glow.set(null)
        orbit = true;
    })
    mesh.click.subscribe(_ => dispatch("click"));
    
    mesh.setTooltip("pabaa")

    onDestroy(() => {
        geometry.dispose();
        material.dispose();
        three.scene.remove(mesh);
    })

    // TODO: Add a for waypoints to know about other orbiting waypoints
    function addOrbit() {
        const x = mesh.position.x;
        const z = mesh.position.z
        let speed = randFloat(0.001, 0.003)
        let i = randInt(0, 200);

        mesh.onBeforeRender = (...args) => {
            if (!orbit) return;
            i += speed
            mesh.position.x = x + 5 * Math.cos(i)
            mesh.position.z = z + 5 * Math.sin(i)
        }
   }
</script>
