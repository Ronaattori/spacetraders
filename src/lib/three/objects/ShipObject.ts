import * as THREE from "three";
import { ExtendedMesh } from "./ExtendedMesh";
import type { Ship, SystemWaypoint } from "$lib/api-sdk";
import type { ThreeSystem } from "../ThreeSystem";
import type { WaypointObject } from "./WaypointObject";

export class ShipObject extends ExtendedMesh {
    system: ThreeSystem;

    ship: Ship;
    currentWaypoint: SystemWaypoint | undefined;

    constructor(system: ThreeSystem, ship: Ship, meshParameters?: THREE.MeshBasicMaterialParameters) {
        const geometry = new THREE.ConeGeometry(2, 5, 32)
        const material = new THREE.MeshBasicMaterial(meshParameters);
        super(geometry, material)

        this.system = system;

        this.ship = ship;
        this.name = ship.symbol;

        this.currentWaypoint = system.systemData.waypoints.find(x => x.symbol == ship.nav.waypointSymbol) ?? system.waypointsData[0]
        this.position.x = this.currentWaypoint.x
        this.position.z = this.currentWaypoint.y
    }

    navigateTo(waypoint: WaypointObject) {
        this.system.threeHelper.drawLine(this.position, waypoint.position)
    }

}