import type { SystemWaypoint } from '$lib/api-sdk';
import * as THREE from 'three';
import { ExtendedMesh } from './ExtendedMesh';
import { randFloat, randInt } from 'three/src/math/MathUtils';
import type { ThreeSystem } from '../ThreeSystem';

export class WaypointObject extends ExtendedMesh {
    system: ThreeSystem;
    waypoint: SystemWaypoint;
    orbit = true;

    constructor(system: ThreeSystem, waypoint: SystemWaypoint, radius: number, meshParamenters?: THREE.MeshBasicMaterialParameters) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshBasicMaterial(meshParamenters);
        super(geometry, material)

        this.system = system;

        this.waypoint = waypoint;
        this.name = waypoint.symbol;

        this.position.x = waypoint.x
        this.position.z = waypoint.y
        
        // Make the planet spin a bit
        this.onRender.push({
            action: () => this.rotation.x += 0.001
        })
        this.onRender.push({
            action: () => this.rotation.y += 0.001
        })

        // Orbit around its coordinates
        if (waypoint.orbits) {
            this.onPointerEnter.push({
                action: () => {
                    this.orbit = false
                }
            });
            this.onPointerOut.push({
                action: () => this.orbit = true
            });
            const x = this.position.x;
            const z = this.position.z
            let speed = randFloat(0.001, 0.003)
            let i = randInt(0, 200);

            this.onRender.push({
                action: () => {
                    if (!this.orbit) return;
                    i += speed
                    this.position.x = x + 5 * Math.cos(i)
                    this.position.z = z + 5 * Math.sin(i)
                }
            })
        }
    }
}