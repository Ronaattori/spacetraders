<script context="module" lang="ts">
    interface WaypointMeshInstructions {
        geometry: new () => THREE.BufferGeometry,
        material: new (parameters?: THREE.MeshStandardMaterialParameters) => THREE.MeshStandardMaterial,
        texture?: string,
    }
    class LoadedInstructions {
        geometry: THREE.BufferGeometry
        material: THREE.Material
        texture?: THREE.Texture

        constructor(geometry: THREE.BufferGeometry, material: THREE.Material, texture?: THREE.Texture) {
            this.geometry = geometry
            this.material = material        
            this.texture = texture
        }
    }
    const instructions: Map<WaypointType, WaypointMeshInstructions | LoadedInstructions> = new Map([
        [WaypointType.PLANET, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.GAS_GIANT, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.MOON, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial,
            texture: "/src/lib/images/moon.jpg"
        }],
        [WaypointType.ORBITAL_STATION, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.JUMP_GATE, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.ASTEROID_FIELD, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.ASTEROID, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.ENGINEERED_ASTEROID, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.ASTEROID_BASE, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.NEBULA, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.DEBRIS_FIELD, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.GRAVITY_WELL, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.ARTIFICIAL_GRAVITY_WELL, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
        [WaypointType.FUEL_STATION, {
            geometry: THREE.SphereGeometry,
            material: THREE.MeshStandardMaterial
        }],
    ])
</script>
<script lang="ts">
    import * as THREE from "three";
    import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
    import type { SystemContext, ThreeContext } from "$lib/three/contexts";
    import { WaypointType, type SystemWaypoint, type System, type Waypoint, WaypointTrait } from "$lib/api-sdk";
    import { randFloat, randInt } from "three/src/math/MathUtils";
    import { ExtendedMesh } from "$lib/three/ExtendedMesh";
    import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer";
    import WaypointInfo from "../spacetraders/tooltip/WaypointInfo.svelte";
    import type { InteractMenuItem } from "../common/InteractMenu.svelte";
    import { api } from "$lib/api";
    import { windows } from "$lib/stores";
    import ShipyardWindow from "../spacetraders/window/ShipyardWindow.svelte";
    import MarketplaceWindow from "../spacetraders/window/MarketplaceWindow.svelte";

    export let systemWaypoint: SystemWaypoint; 
    export let waypoint: Waypoint | undefined; 

    export let meshParameters: THREE.MeshStandardMaterialParameters = {}
    const dispatch = createEventDispatcher()
    
    // Component specific reactive values
    let orbit = true;

    // Get contexts
    const three = getContext<ThreeContext>("three")
    const system = getContext<SystemContext>("system");
    
    // Create the actual object
    const type = systemWaypoint.type;
    let instruction = instructions.get(type)
    // Load the materials, geometries...
    if (!instruction) throw `Waypoint of type ${type} is not supported!`
    if (!(instruction instanceof LoadedInstructions)) {
        let texture = undefined;
        if (instruction.texture) {
            texture = three.textureLoader.load(instruction.texture);
        }
        const geometry = new instruction.geometry()
        geometry.scale(1.5, 1.5, 1.5)
        const material = new instruction.material({...meshParameters, map: texture})
        const loaded = new LoadedInstructions(geometry, material, texture);
        instructions.set(type, loaded)
        instruction = loaded
    }
    const mesh = new ExtendedMesh(instruction.geometry, instruction.material, three)

    mesh.name = systemWaypoint.symbol
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Set the position and possibly make it orbit around that point
    mesh.position.set(systemWaypoint.x, 0, systemWaypoint.y)
    three.scene.add(mesh)

    // Run all functions in the array on render
    const runOnRender: Array<() => void> = []
    mesh.onBeforeRender = () => {
        runOnRender.forEach(func => func())        
    }

    // Animate waypoints
    const spin = () => {
        mesh.rotation.x += 0.0004
        mesh.rotation.y += 0.0004
    }
    runOnRender.push(spin)
    if (systemWaypoint.orbits) addOrbit();
        
    // Attach event listeners
    mesh.pointerenter.subscribe(_ => {
        dispatch("pointerenter");
        mesh.glow.set(1)
        orbit = false;
    })
    mesh.pointerout.subscribe(_ => {
        dispatch("pointerout");
        mesh.glow.set(null)
        orbit = true;
    })
    mesh.click.subscribe(_ => dispatch("click"));
    mesh.contextmenu.subscribe(_ => {
        dispatch("contextmenu")
        // if (waypoint) Contextmenu.createFromWaypoint(mesh, waypoint);
    });
    
    // Initialize a contextmenu for the mesh when we have required data to do so
    let contextmenu = false;
    $: if (waypoint && !contextmenu) initContext(waypoint);
    function initContext(waypoint: Waypoint)  {
        contextmenu = true;
        const items: InteractMenuItem[] = [];
        for (const trait of waypoint.traits) {
            switch (trait.symbol) {
                case (WaypointTrait.symbol.SHIPYARD):
                    items.push({
                        label: "Open Shipyard shop",
                        onClick: async () => {
                            const shipyard = (await api.systems.getShipyard(waypoint.systemSymbol, waypoint.symbol)).data;
                            windows.add("Shipyard", ShipyardWindow, {shipyard})
                        }
                    })
                    break;
                case (WaypointTrait.symbol.MARKETPLACE):
                    items.push({
                        label: "Open Marketplace shop",
                        onClick: async () => {
                            const marketplace = (await api.systems.getMarket(waypoint.systemSymbol, waypoint.symbol)).data;
                            windows.add("Marketplace", MarketplaceWindow, {marketplace})
                        }
                    })
                    break;
            }
        }
        mesh.setContextmenu(items);
    }
    
    // Set the tooltip when we get waypoint data
    let tooltip = false;
    $: if(waypoint && !tooltip) {
        tooltip = true
        mesh.setTooltip({component: WaypointInfo, props: {waypoint}});
    }

    onDestroy(() => {
        three.scene.remove(mesh);
    })

    // TODO: Add a for waypoints to know about other orbiting waypoints
    function addOrbit() {
        const x = mesh.position.x;
        const z = mesh.position.z
        let speed = randFloat(0.001, 0.003)
        let i = randInt(0, 200);

        const func = () => {
            if (!orbit) return;
            i += speed
            mesh.position.x = x + 5 * Math.cos(i)
            mesh.position.z = z + 5 * Math.sin(i)
        }
        runOnRender.push(func)
   }
</script>
