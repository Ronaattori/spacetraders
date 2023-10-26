<script lang="ts">
    import { ThreeHelper } from "$lib/ThreeHelper";
    import { onMount } from "svelte";
    import { BoxGeometry, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer, type ColorRepresentation } from "three";
    import munkki from "$lib/images/munkki.jpg"
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";

    let container:HTMLElement; 
    const pointer = new Vector2();

    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const threeHelper = new ThreeHelper(scene, camera, pointer);

    onMount(async () => {
        container.appendChild(threeHelper.renderer.domElement);
       
        const munkkiTexture = threeHelper.textureLoader.load(munkki)
        const ball = threeHelper.createSphere({map: munkkiTexture})
        threeHelper.scene.add(ball)

        threeHelper.onMouseOver(ball, () => {
            changeColor(ball, Math.random() * 0xffffff)            
        })

        camera.position.z = 10;
        
        threeHelper.addRotation(ball, "x", 0.001)
        threeHelper.addRotation(ball, "y", 0.001)
        
        threeHelper.animate();
    })  
    function changeColor(mesh: Mesh, color:ColorRepresentation) {
        const material = mesh.material as MeshBasicMaterial
        material.color.set(color);
    }
    function onPointerMove( event:MouseEvent ) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
/*         const sidebarPad = container.getBoundingClientRect().left; */
        const sidebarPad = container.getBoundingClientRect().left;
        const topPad = container.getBoundingClientRect().top;
        const wid = (event.clientX - sidebarPad)
        const hei = (event.clientY - topPad)
        pointer.x = ( wid / window.innerWidth  * 2 - 1);
        pointer.y = - ( hei / window.innerHeight ) * 2 + 1;
    }


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={container} on:mousemove={onPointerMove}>

</div>