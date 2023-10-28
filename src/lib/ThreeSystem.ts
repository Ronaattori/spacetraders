import { EquirectangularReflectionMapping, Vector3, Scene, type Texture } from "three";
import type { System, SystemWaypoint } from "./api-sdk"
import type { ThreeHelper } from "./ThreeHelper";
import munkki from '$lib/images/munkki.jpg'
// @ts-ignore
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'

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
        this.threeHelper.textureLoader.load("/src/lib/images/skybox.png", (texture) => {
            texture.mapping = EquirectangularReflectionMapping
            this.threeHelper.scene.background = texture
            this.threeHelper.scene.environment = texture
        })

        // Render the waypoints
        for (const waypoint of this.waypoints) {
            const mesh = this.createWaypoint(waypoint)
            this.threeHelper.setMeshColor(mesh, "random")

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
        
        this.threeHelper.addLabel(ball, waypoint.symbol)

        ball.position.x = waypoint.x
        ball.position.z = waypoint.y
        ball.scale.set(1.5, 1.5, 1.5)

        // Make the planet spin a bit
        this.threeHelper.addRotation(ball, "x", 0.001)
        this.threeHelper.addRotation(ball, "y", 0.001)
        
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