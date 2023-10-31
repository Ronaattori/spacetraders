import type * as THREE from "three";

export type ThreeContext = {
    scene: THREE.Scene,
    camera: THREE.Camera,
    pointer: THREE.Vector2        
}