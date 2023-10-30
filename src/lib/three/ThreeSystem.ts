import { EquirectangularReflectionMapping, Vector3, Scene, type Texture, Mesh, BufferGeometry, MeshBasicMaterial, BufferAttribute, ConeGeometry, LineBasicMaterial, Line, SphereGeometry, MeshStandardMaterial, PointLight, PointLightHelper } from "three";
import type { Ship, System, SystemWaypoint, Waypoint } from "$lib/api-sdk"
import type { ThreeHelper } from "./ThreeHelper";
import munkki from '$lib/images/munkki.jpg'
import { WaypointObject } from "./objects/WaypointObject";
import { ShipObject } from "./objects/ShipObject";
import WaypointInfo from "$lib/components/WaypointInfo.svelte";
import { api } from "$lib/api";
import { notifications } from "$lib/stores";
import { SunObject } from "./objects/SunObject";

type SystemOptions = {
    scale?: number
}

export class ThreeSystem {
    // Data from Spacetraders
    systemData: System;
    systemWaypointsData: SystemWaypoint[];
    waypointsData: Record<string, Waypoint> = {};
    shipData: Ship;
    
    // Rendered objects
    waypoints: WaypointObject[] = [];
    ship: ShipObject;
    
    scale: number;
    
    threeHelper: ThreeHelper;

    constructor(system: System, ship: Ship, threeHelper: ThreeHelper, options: SystemOptions) {    
        this.systemData = system
        this.systemWaypointsData= system.waypoints
        this.shipData = ship;

        this.threeHelper = threeHelper

        // Read various options
        this.scale = options.scale ?? 1

        // Start rendering the system
        this.threeHelper.scene.clear()

        // Create a skybox
        this.threeHelper.textureLoader.load("/src/lib/images/skybox.png", (texture) => {
            texture.mapping = EquirectangularReflectionMapping
            this.threeHelper.scene.background = texture
            this.threeHelper.scene.environment = texture
        })
        
        // Create a sun
        const sun = new SunObject(this, 4, {color: 0xffff00})
        this.threeHelper.scene.add(sun)

        // Draw your ship
        this.ship = this.createShip(this.shipData)
        this.threeHelper.scene.add(this.ship)

        // Render the waypoints
        for (const waypoint of this.systemWaypointsData) {
            const mesh = this.createWaypoint(waypoint)
            this.threeHelper.setMeshColor(mesh, "random")

            mesh.onClick.push({
                action: () => this.ship.navigateTo(mesh)
            })

            this.waypoints.push(mesh);
            this.threeHelper.scene.add(mesh)
        }

        // Start enriching given system data arynchronously and do stuff with the data
        this.fetchWaypoints().then((waypoints) => {
            notifications.success("Waypoint fetching done...")
            this.waypointsData = Object.fromEntries(waypoints.map(x => [x.symbol, x]))
            // TODO: This kind of expects this.waypoints to be filled by this point
            // It usually is, but this still isnt very cool
            for (const waypoint of this.waypoints) {
                const tooltip = this.threeHelper.addTooltip(waypoint, {
                    component: WaypointInfo,
                    props: {waypoint: this.waypointsData[waypoint.name]}
                })
            }
        })
        
    }
    async fetchWaypoints(page = 1) {
        // Recursively get all waypoints in the current system
        let waypoints: Waypoint[] = []
        let pageSize = 20
        const res = (await api.systems.getSystemWaypoints(this.systemData.symbol, page, pageSize)).data
        waypoints = [...waypoints, ...res]
        if (res.length == pageSize) {
            const more = await this.fetchWaypoints(page+1)
            waypoints = [...waypoints, ...more]
        }
        return waypoints;
    }

    getWaypoint(waypointSymbol: string) {
        const waypoint = this.systemWaypointsData.find(x => x.symbol == waypointSymbol)
        return waypoint;
    }

    createShip(ship: Ship) {
        const mesh = new ShipObject(this, ship, {color: 0xffff00})
        return mesh;
    }
    createWaypoint(waypoint: SystemWaypoint) {
        const texure = this.threeHelper.textureLoader.load(munkki);
        const ball = new WaypointObject(this, waypoint, 1.5, {map: texure})
        
        const label = this.threeHelper.addLabel(ball, waypoint.symbol)
        
        return ball
    }

}