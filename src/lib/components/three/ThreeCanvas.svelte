<script lang="ts">
    import * as THREE from "three";
    import { onMount, setContext } from "svelte";
    import type { ThreeContext } from "$lib/three/contexts";
    import { MapControls } from 'three/addons/controls/MapControls'
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass';
    import { RenderPixelatedPass } from "three/examples/jsm/postprocessing/RenderPixelatedPass";
    // @ts-ignore
    import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader'
    import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
    import { writable } from "svelte/store";
    import { ExtendedMesh } from "$lib/three/ExtendedMesh";
    import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer";
    import { tweened } from "svelte/motion";
    import { cubicInOut, sineInOut } from "svelte/easing";


    let container: HTMLElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    const pointer = new THREE.Vector2( 0.5, 0.5);
    const raycaster = new THREE.Raycaster()
    const textureLoader = new THREE.TextureLoader();
    const renderer = new THREE.WebGLRenderer();
    const effectComposer = new EffectComposer(renderer)
    effectComposer.addPass(new RenderPass(scene ,camera))
    // effectComposer.addPass(new RenderPixelatedPass(5, scene, camera))
    // effectComposer.addPass(new ShaderPass(GammaCorrectionShader))
    const css2dRenderer = new CSS2DRenderer()
    css2dRenderer.setSize(window.innerWidth, window.innerHeight)
    css2dRenderer.domElement.style.position = 'absolute';
    css2dRenderer.domElement.style.top = '0px';
    css2dRenderer.domElement.style.pointerEvents = 'none';
    const controls = new MapControls(camera, renderer.domElement)
    camera.position.set(0, 30, 100)
    camera.lookAt(new THREE.Vector3(0, 0, 0))


    setContext<ThreeContext>("three", {
        scene: scene,
        camera: camera,
        pointer: pointer,
        textureLoader: textureLoader,
        effectComposer: effectComposer,
    })

    onMount(() => {
        container.append(renderer.domElement);
        container.append(css2dRenderer.domElement);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize( window.innerWidth, window.innerHeight );
        effectComposer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;

        // Create a skybox. Start it early since it takes a while
        textureLoader.load("/src/lib/images/skybox.png", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.background = texture
            scene.environment = texture
        })
        
        // Create some minor ambient light
        const light = new THREE.HemisphereLight(undefined, undefined, 1.5)
        scene.add(light)
        
        // Attach event listeners
        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("click", onClick);
        window.addEventListener("contextmenu", onContextmenu);

        animate();

        // And clean up after ourselves when the component is removed
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("click", onClick);
            window.removeEventListener("contextmenu", onContextmenu);
            controls.dispose();
            renderer.dispose();
            effectComposer.dispose();
            renderer.domElement.remove();
        }
    });

    function animate() {
        requestAnimationFrame( animate );
        // renderer.render( scene, camera );
        effectComposer.render()
        css2dRenderer.render(scene, camera)
    }

    function onResize() {
        css2dRenderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    let hovered: Record<string, THREE.Object3D> = {}
    function onClick(e: MouseEvent) {
        for (const hit of Object.values(hovered)) {
            if (hit instanceof ExtendedMesh) hit.click.trigger();
        }
    }
    function onContextmenu(e: MouseEvent) {
        for (const hit of Object.values(hovered)) {
            if (hit instanceof ExtendedMesh) hit.contextmenu.trigger();
        }
    }
    function onPointerMove(e: MouseEvent) {
        // // Update our pointers position
        const bounds = renderer.domElement.getBoundingClientRect()
        const wid = ((e.clientX - bounds.left) / window.innerWidth) * 2 - 1;
        const hei = -((e.clientY - bounds.top) / window.innerHeight) * 2 + 1;
        pointer.set(wid, hei)
        if (e.target != renderer.domElement) return;

        // Check what objects are currently under our cursor
        raycaster.setFromCamera(pointer, camera)
        const intersects = raycaster.intersectObjects(scene.children, true)
        
        // If a previously mouseovered item isn't mouseovered anymore 
        for (const key of Object.keys(hovered)) {
            const hit = intersects.find(hit => hit.object.name == key)
            if (hit) continue;
            const obj = scene.getObjectByName(key);
            if (!obj) throw `Object with name ${key} not found!`
            if (obj instanceof ExtendedMesh) obj.pointerout.trigger()
            delete hovered[key]
        }
        
        for (const hit of intersects) {
            const name = hit.object.name
            // Mark an object as hovered and run its onPointerEnters
            if (!hovered[name]) {
                const mesh = hit.object
                hovered[name] = mesh
                if (mesh instanceof ExtendedMesh) mesh.pointerenter.trigger()
            }
        }
    }
    
    // And then exported functions to manipulate the scene

    /**
     * Smoothly turn the camera to look at the object that name matches symbol
     * @param symbol name of the THREE.Object3D to look at
     */
    export function smoothLookAt(symbol: string) {
        const obj = scene.getObjectByName(symbol)
        if (!obj) return;
        const cmr = tweened(controls.target, {
            duration: 200,
            easing: sineInOut
        })
        cmr.subscribe((cur) => {
            controls.target.copy(cur)
            controls.update()
        })
        cmr.set(obj.position)
    }
    
    export function highlight(symbol: string) {
        const obj = scene.getObjectByName(symbol) as ExtendedMesh;
        if (!obj) return;
        obj.glow.set(2);
        setTimeout(() => {
           obj.glow.set(null) 
        }, 3000);
    }


</script>

<div bind:this={container}>
    <slot/>
</div>