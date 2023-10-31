<script lang="ts">
    import * as THREE from "three";
    import { onMount, setContext } from "svelte";
    import type { ThreeContext } from "./contexts";
    // @ts-ignore
    import { MapControls } from 'three/addons/controls/MapControls'

    let container: HTMLElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    const pointer = new THREE.Vector2( 0.5, 0.5);
    const textureLoader = new THREE.TextureLoader();
    let renderer: THREE.WebGLRenderer;

    setContext<ThreeContext>("three", {
        scene: scene,
        camera: camera,
        pointer: pointer,
        textureLoader: textureLoader,
    })

    onMount(() => {
        renderer = new THREE.WebGLRenderer({canvas: container});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;

        // Create a skybox. Start it early since it takes a while
        textureLoader.load("/src/lib/images/skybox.png", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.background = texture
            scene.environment = texture
        })
        
        // Attach event listeners
        window.addEventListener("resize", onResize);
        // window.addEventListener("pointermove", this.onPointerMove);
        // window.addEventListener("click", this.onClick);


        // Camera movement handling
        const controls = new MapControls(camera, renderer.domElement)
        controls.enableDamping = true;
        camera.position.set(0, 50, -50)

        animate();


        // And clean up after ourselves when the component is removed
        return () => {
            window.removeEventListener("resize", onResize);
            controls.dispose();
        }
    });

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

    function onResize() {
        // this.css2dRenderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

</script>

<canvas bind:this={container}>
    <slot/>
</canvas>