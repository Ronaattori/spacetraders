declare module "three/examples/jsm/postprocessing/RenderPass" {
    import * as THREE from "three";
    import type { Pass } from "./Pass";

    class RenderPass extends Pass {
        constructor(scene: THREE.Scene, camera: THREE.Camera, overrideMaterial = null, clearColor = null, clearAlpha = null)
        
        render(renderer, writeBuffer, readBuffer)
    }
}