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
    ships: ShipObject[] = [];
    
    scale: number;
    
    threeHelper: ThreeHelper;

   constructor(system: System, ship: Ship, threeHelper: ThreeHelper, options: SystemOptions) {
    this.systemData = system
    this.waypointsData = system.waypoints
    this.shipData = ship;
    
    this.threeHelper = threeHelper
    
    this.scale = options.scale ?? 1
   }

    async drawSystem() {
        this.threeHelper.scene.clear()

        // Create a skybox
        this.threeHelper.textureLoader.load("/src/lib/images/skybox.png", (texture) => {
            texture.mapping = EquirectangularReflectionMapping
            this.threeHelper.scene.background = texture
            this.threeHelper.scene.environment = texture
        })

        // Render the waypoints
        for (const waypoint of this.waypointsData) {
            const mesh = this.createWaypoint(waypoint)
            this.threeHelper.setMeshColor(mesh, "random")

            // // TODO Navigate on on click
            // this.threeHelper.onMouseOver(mesh, () => {
            //     if (ship) {
            //         this.navigateTo(mesh.name)
            //     }
            // })

            this.threeHelper.scene.add(mesh)
        }
        
        // Draw your ship
        const ship = this.createShip(this.shipData)
        this.threeHelper.scene.add(ship)
    }

    getWaypoint(waypointSymbol: string) {
        const waypoint = this.waypointsData.find(x => x.symbol == waypointSymbol)
        return waypoint;
    }

    createShip(ship: Ship) {
        const mesh = new ShipObject(ship, this, {color: 0xffff00})
        this.ships.push(mesh);
        return mesh;
    }
    createWaypoint(waypoint: SystemWaypoint) {
        const texure = this.threeHelper.textureLoader.load(munkki);
        const ball = new WaypointObject(waypoint, 1.5, {map: texure})
        
        this.threeHelper.addLabel(ball, waypoint.symbol)

        this.waypoints.push(ball);
        return ball
    }

}