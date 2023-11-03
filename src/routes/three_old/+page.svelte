<script lang="ts">
    import { ThreeHelper } from "$lib/three/ThreeHelper";
    import { onMount } from "svelte";
    import { BoxGeometry, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer, type ColorRepresentation } from "three";
    import { api } from "$lib/api";
    import { myAgent } from "$lib/stores";
    import type { Ship } from "$lib/api-sdk";
    import { ThreeSystem } from "$lib/three/ThreeSystem";


    let container:HTMLElement; 
    let selectedShip: Ship;
    const pointer = new Vector2( 0.5, 0.5);

    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const threeHelper = new ThreeHelper(scene, camera, pointer);


    async function selectShip(ship: Ship) {
        selectedShip = ship;
        const system = (await api.systems.getSystem(ship.nav.systemSymbol)).data
        const sys = new ThreeSystem(system, ship, threeHelper, {scale: 0.6});
    }

    onMount(async () => {
        if ($myAgent.ships.length > 0) {
            selectShip($myAgent.ships[0])
        }

        container.appendChild(threeHelper.renderer.domElement);
        container.appendChild(threeHelper.css2dRenderer.domElement);
       
        camera.position.set(0, 50, -50)
        
        threeHelper.animate();

        // And clean up after ourselves when the component is removed
        return () => {
            
        }
    })  

</script>

<div>
   Select ship:
   {#each $myAgent.ships as ship (ship.symbol)}
        <button class="btn {selectedShip == ship ? "btn-primary" : ""}" 
        on:click={() => selectShip(ship)}>
            {ship.symbol}
        </button>
   {/each} 
</div>

<div bind:this={container}>

</div>