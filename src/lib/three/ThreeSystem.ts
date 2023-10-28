import { EquirectangularReflectionMapping, Vector3, Scene, type Texture, Mesh, BufferGeometry, MeshBasicMaterial, BufferAttribute, ConeGeometry, LineBasicMaterial, Line } from "three";
import type { Ship, System, SystemWaypoint } from "$lib/api-sdk"
import type { ThreeHelper } from "./ThreeHelper";
import munkki from '$lib/images/munkki.jpg'
import { WaypointObject } from "./objects/WaypointObject";

type SystemOptions = {
    scale?: number
}

export class ThreeSystem {
    // Data from Spacetraders
    systemData: System;
    waypointsData: SystemWaypoint[];
    shipData: Ship;
    
    // Rendered objects
    waypoints: Mesh[] = []
    ship: Mesh | undefined;
    
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

            // this.threeHelper.onMouseOver(mesh, () => {
            //     if (ship) {
            //         this.navigateTo(mesh.name)
            //     }
            // })

            this.threeHelper.scene.add(mesh)
        }
        
        // Draw your ship
        const ship = this.createShip(this.shipData)
        this.ship = ship;
        this.threeHelper.scene.add(ship)
    }

    getWaypoint(waypointSymbol: string) {
        const waypoint = this.waypointsData.filter(x => x.symbol == waypointSymbol)[0]
        return waypoint;
    }

    navigateTo(waypointSymbol: string) {
        const waypointMesh = this.threeHelper.scene.getObjectByName(waypointSymbol)
        if (!waypointMesh || !this.ship) throw "Not ready for navigation";
        this.threeHelper.drawLine(this.ship.position, waypointMesh.position)
    }

    createShip(ship: Ship) {
        const mesh = this.threeHelper.createCone({color: 0xffff00})
        const currentWaypoint = this.waypointsData.filter(x => x.symbol == ship.nav.waypointSymbol)[0]
        mesh.position.x = currentWaypoint.x
        mesh.position.z = currentWaypoint.y
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