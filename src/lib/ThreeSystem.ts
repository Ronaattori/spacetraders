import type { Scene } from "three";
import type { System, SystemWaypoint } from "./api-sdk"
import type { ThreeHelper } from "./ThreeHelper";
import munkki from '$lib/images/munkki.jpg'

type SystemOptions = {
    scale?: number
}

export class ThreeSystem {
    system: System;
    waypoints: SystemWaypoint[];

    scale: number;
    
    threeHelper: ThreeHelper;

   constructor(system: System, threeHelper: ThreeHelper, options: SystemOptions) {
    this.system = system
    this.waypoints = system.waypoints
    
    this.threeHelper = threeHelper
    
    this.scale = options.scale ?? 1
   }

    async drawSystem() {
        this.threeHelper.scene.clear()
        for (const waypoint of this.waypoints) {
            const mesh = this.createWaypoint(waypoint)
            this.threeHelper.setMeshColor(mesh, "random")
            this.threeHelper.addRotation(mesh, "x", 0.001)
            this.threeHelper.addRotation(mesh, "y", 0.001)

            this.threeHelper.onMouseOver(mesh, () => {
                console.log(waypoint.symbol)
            })
            this.threeHelper.scene.add(mesh)
        }
    }

    createWaypoint(waypoint: SystemWaypoint) {
        const texure = this.threeHelper.textureLoader.load(munkki);
        const ball = this.threeHelper.createSphere({map: texure});
        ball.name = waypoint.symbol;
        
        // Scale down the galaxy a bit
        ball.position.x = waypoint.x
        ball.position.z = waypoint.y
        
        if (waypoint.orbits) {
            const orbit = this.threeHelper.addOrbit(ball, 15, 0.005)    
            this.threeHelper.onMouseOver(ball, () => {
                orbit.skip = true
            })
        }
        
        return ball
    }

}