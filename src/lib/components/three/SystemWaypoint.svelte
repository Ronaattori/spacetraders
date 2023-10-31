<script lang="ts">
    import * as THREE from "three";
    import { getContext } from "svelte";
    import type { ThreeContext } from "$lib/components/three/contexts";
    import type { SystemWaypoint } from "$lib/api-sdk";

    export let SystemWaypoint: SystemWaypoint; 

    export let radius = 1.5;
    export let meshParamenters: THREE.MeshStandardMaterialParameters = {}

    const three = getContext<ThreeContext>("three")
    
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    const material = new THREE.MeshStandardMaterial(meshParamenters);
    const mesh = new THREE.Mesh(geometry, material)
    
    mesh.position.set(SystemWaypoint.x, 0, SystemWaypoint.y)
    
    three.scene.add(mesh)

</script>
