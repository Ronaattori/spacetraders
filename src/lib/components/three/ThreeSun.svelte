<script lang="ts">
    import * as THREE from "three";
    import { getContext } from "svelte";
    import type { ThreeContext } from "$lib/components/three/contexts";

    export let position = new THREE.Vector3(0, 0, 0);

    export let intensity = 50;
    export let distance = 0;
    export let decay = 0.4;

    export let meshParamenters: THREE.MeshBasicMaterialParameters = {}

    export let radius = 4;

    const three = getContext<ThreeContext>("three")
    
    const geometry = new THREE.SphereGeometry(radius, 32, 32)
    const material = new THREE.MeshBasicMaterial(meshParamenters);
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position.x, position.y, position.z)
    three.scene.add(mesh)

    const pointLight = new THREE.PointLight(0xffff99, intensity, distance, decay)
    three.scene.add(pointLight)

</script>
