<script lang="ts">
    import { onMount } from "svelte";
    import { BoxGeometry, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer, type ColorRepresentation } from "three";

    let container:HTMLElement; 
    const raycaster = new Raycaster();
    const pointer = new Vector2();

    onMount(() => {
        const scene = new Scene();
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            
        const renderer = new WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        
        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new Mesh( geometry, material );
        cube.name = "cube"
        scene.add( cube );

        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
            // update the picking ray with the camera and pointer position
            raycaster.setFromCamera( pointer, camera );
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObject( cube );
            if (intersects.length > 0) {
                const obj = intersects[0].object as Mesh
                changeColor(obj, Math.random() * 0xffffff)
            }

            renderer.render( scene, camera );
        }
        animate();
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
        pointer.x = (( wid / window.innerWidth ) * 2 - 1);
        pointer.y = - ( hei / window.innerHeight ) * 2 + 1;
    }


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={container} on:mousemove={onPointerMove}>

</div>