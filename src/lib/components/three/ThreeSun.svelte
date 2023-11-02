<script lang="ts">
    import * as THREE from "three";
    import { createEventDispatcher, getContext, onMount } from "svelte";
    import type { ThreeContext } from "$lib/components/three/contexts";
    import { ExtendedMesh } from "./ExtendedMesh";

    export let position = new THREE.Vector3(0, 0, 0);

    export let intensity = 50;
    export let distance = 0;
    export let decay = 0.4;

    export let meshParamenters: THREE.MeshStandardMaterialParameters = {}

    export let radius = 4;
    const dispatch = createEventDispatcher()

    const three = getContext<ThreeContext>("three")
    let mesh:  ExtendedMesh;
    
    onMount(() => {
        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshStandardMaterial(meshParamenters);
        mesh = new ExtendedMesh(geometry, material, three)
        mesh.position.set(position.x, position.y, position.z)
        three.scene.add(mesh)

        const pointLight = new THREE.PointLight(0xffff99, intensity, distance, decay)
        pointLight.castShadow = true
        
        
        // Attach event listeners
        mesh.pointerenter.subscribe(_ => {
            dispatch("pointerenter");
        })
        mesh.pointerout.subscribe(_ => {
            dispatch("pointerout");
        })

        three.scene.add(pointLight)
        return () => {
            geometry.dispose();
            material.dispose();
            three.scene.remove(mesh);
            three.scene.remove(pointLight);
        }

    })

</script>
