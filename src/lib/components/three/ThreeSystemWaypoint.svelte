<script context="module" lang="ts">
    // const system = getContext<SystemContext>("system");

    // const orbitGroups: Map<string, Array<SystemWaypoint>> = new Map();
    // for (const waypoint of system.system.waypoints) {
    //     const orbits = waypoint.orbits;
    //     if (!orbits) continue;
    //     if (orbitGroups.get(orbits)) {
    //         orbitGroups.set(orbits, [])
    //     }
    //     orbitGroups.get(orbits)?.push(waypoint)
    // }
    // console.log(orbitGroups)
</script>
<script lang="ts">
    import * as THREE from "three";
    import { getContext } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/components/three/contexts";
    import type { System, SystemWaypoint } from "$lib/api-sdk";
    import { randFloat, randInt } from "three/src/math/MathUtils";

    export let systemWaypoint: SystemWaypoint; 

    export let radius = 1.5;
    export let meshParamenters: THREE.MeshStandardMaterialParameters = {}

    const three = getContext<ThreeContext>("three")
    const system = getContext<SystemContext>("system");
    
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    const material = new THREE.MeshStandardMaterial(meshParamenters);
    const mesh = new THREE.Mesh(geometry, material)
    
    // Set the position and possibly make it orbit around that point
    mesh.position.set(systemWaypoint.x, 0, systemWaypoint.y)
    if (systemWaypoint.orbits) orbit();
    
    three.scene.add(mesh)
    
    // TODO: Add a for waypoints to know about other orbiting waypoints
    function orbit() {
        const x = mesh.position.x;
        const z = mesh.position.z
        let speed = randFloat(0.001, 0.003)
        let i = randInt(0, 200);

        mesh.onBeforeRender = (...args) => {
            i += speed
            mesh.position.x = x + 5 * Math.cos(i)
            mesh.position.z = z + 5 * Math.sin(i)
        }
   }


</script>
