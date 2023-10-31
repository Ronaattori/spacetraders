import type { System } from "$lib/api-sdk";
import type * as THREE from "three";

export type ThreeContext = {
    scene: THREE.Scene,
    camera: THREE.Camera,
    pointer: THREE.Vector2,
    textureLoader: THREE.TextureLoader

}
export type SystemContext = {
    system: System
}