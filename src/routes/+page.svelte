<script lang="ts">
    import { ThreeHelper } from "$lib/ThreeHelper";
    import { onMount } from "svelte";
    import { BoxGeometry, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer, type ColorRepresentation } from "three";
    import munkki from "$lib/images/munkki.jpg"
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";
    import type { Ship } from "$lib/api-sdk";
    import { ThreeSystem } from "$lib/ThreeSystem";
    // @ts-ignore
    import { MapControls } from 'three/addons/controls/MapControls'


    let container:HTMLElement; 
    let selectedShip: Ship;
    const pointer = new Vector2();

    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const threeHelper = new ThreeHelper(scene, camera, pointer);


    async function selectShip(ship: Ship) {
        selectedShip = ship;
        const system = (await api.systems.getSystem(ship.nav.systemSymbol)).data
        const sys = new ThreeSystem(system, threeHelper, {scale: 0.6});
        sys.drawSystem()
    }

    onMount(async () => {
        if ($myAgent.ships.length > 0) {
            selectShip($myAgent.ships[0])
        }

        container.appendChild(threeHelper.renderer.domElement);
       
        camera.position.set(0, 50, -50)
        
        threeHelper.animate();
    })  

    // Camera movement handling
    const controls = new MapControls(camera, threeHelper.renderer.domElement)
    controls.enableDamping = true;
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
<div>
   Select ship:
   {#each $myAgent.ships as ship (ship.symbol)}
        <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
        on:click={() => selectShip(ship)}>
            {ship.symbol}
        </button>
   {/each} 
</div>

<div bind:this={container} on:mousemove={onPointerMove}>

</div>