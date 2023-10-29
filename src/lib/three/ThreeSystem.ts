import { EquirectangularReflectionMapping, Vector3, Scene, type Texture, Mesh, BufferGeometry, MeshBasicMaterial, BufferAttribute, ConeGeometry, LineBasicMaterial, Line } from "three";
import type { Ship, System, SystemWaypoint } from "$lib/api-sdk"
import type { ThreeHelper } from "./ThreeHelper";
import munkki from '$lib/images/munkki.jpg'
import { WaypointObject } from "./objects/WaypointObject";
import { ShipObject } from "./objects/ShipObject";

type SystemOptions = {
    scale?: number
}

export class ThreeSystem {
    // Data from Spacetraders
    systemData: System;
    waypointsData: SystemWaypoint[];
    shipData: Ship;
    
    // Rendered objects
    waypoints: WaypointObject[] = [];
    ship: ShipObject;
    
    scale: number;
    
    threeHelper: ThreeHelper;

    constructor(system: System, ship: Ship, threeHelper: ThreeHelper, options: SystemOptions) {    
        this.systemData = system
        this.waypointsData = system.waypoints
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

        // Draw your ship
        this.ship = this.createShip(this.shipData)
        this.threeHelper.scene.add(this.ship)

        // Render the waypoints
        for (const waypoint of this.waypointsData) {
            const mesh = this.createWaypoint(waypoint)
            this.threeHelper.setMeshColor(mesh, "random")

            mesh.onClick.push({
                action: () => this.ship.navigateTo(mesh)
            })

            this.waypoints.push(mesh);
            this.threeHelper.scene.add(mesh)
        }
        
    }

    getWaypoint(waypointSymbol: string) {
        const waypoint = this.waypointsData.find(x => x.symbol == waypointSymbol)
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