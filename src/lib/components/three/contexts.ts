import type { System } from "$lib/api-sdk";
import type { Writable } from "svelte/store";
import type * as THREE from "three";
import type { EffectComposer } from "three/addons/postprocessing/EffectComposer";

export type ThreeContext = {
    scene: THREE.Scene,
    camera: THREE.Camera,
    pointer: THREE.Vector2,
    textureLoader: THREE.TextureLoader,
    effectComposer: EffectComposer,
    intersected: Writable<THREE.Object3D[]>,

}
export type SystemContext = {
    system: System
}