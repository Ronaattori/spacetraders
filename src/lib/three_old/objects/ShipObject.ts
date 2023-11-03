import * as THREE from "three";
import { ExtendedMesh } from "./ExtendedMesh";
import type { Ship, SystemWaypoint } from "$lib/api-sdk";
import type { ThreeSystem } from "../ThreeSystem";
import type { WaypointObject } from "./WaypointObject";
import { api } from "$lib/api";
import { myAgent, notifications } from "$lib/stores";
import { tweened } from "svelte/motion";

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

    async navigateTo(waypoint: WaypointObject) {
        this.system.threeHelper.drawLine(this.position, waypoint.position)

        const res = await api.fleet.navigateShip(this.ship.symbol, {waypointSymbol: waypoint.name});
        this.ship = Object.assign(this.ship, res.data)

        const arrival = new Date(res.data.nav.route.arrival);
        const duration = this.millisecondsUntilArrival(arrival)

        const x = tweened(this.position.x, {duration: duration})
        const z = tweened(this.position.z, {duration: duration})
        x.subscribe(pos => this.position.x = pos)
        z.subscribe(pos => this.position.z = pos)
        x.set(waypoint.position.x)
        z.set(waypoint.position.z)
        setTimeout(() => {
            notifications.success(`Ship ${this.ship.symbol} succesfully arrived at ${waypoint.name}`)
        }, duration);
        
        // Add a label to the moving ship
        const durationString = () => `Arrival: ${this.millisecondsUntilArrival(arrival) / 1000}s`
        const label = this.system.threeHelper.addLabel(this, durationString())
        const interval = setInterval(() => {
            label.element.innerText = durationString()
        }, 1000)
        setTimeout(() => {
            clearInterval(interval)
        }, duration);

    }

    millisecondsUntilArrival(arrival: Date) {
        const time = Math.round((arrival.getTime() - new Date().getTime()));        
        return time;
    }

}