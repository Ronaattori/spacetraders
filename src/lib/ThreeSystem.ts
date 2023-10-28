import { EquirectangularReflectionMapping, type Scene, type Texture } from "three";
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

        // Create a skybox
        this.threeHelper.rgbeLoader.load("/src/lib/3d_assets/skybox.hdr", (texture: Texture) => {
            texture.mapping = EquirectangularReflectionMapping
            this.threeHelper.scene.background = texture
            this.threeHelper.scene.environment = texture
        });

        // Render the waypoints
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
            const orbit = this.threeHelper.addOrbit(ball, 5, 0.002)    
            this.threeHelper.onMouseOver(ball, () => {
                orbit.skip = true
            }, () => {
                orbit.skip = false
            })
        }
        
        return ball
    }

}