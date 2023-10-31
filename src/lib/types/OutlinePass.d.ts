declare module "three/addons/postprocessing/OutlinePass" {
    import * as THREE from "three";
    import type { Pass } from "./Pass";

    class OutlinePass extends Pass {
        selectedObjects: THREE.Object3D[]
        visibleEdgeColor = new THREE.Color( 1, 1, 1 );
		hiddenEdgeColor = new THREE.Color( 0.1, 0.04, 0.02 );
		edgeGlow = 0.0;
		usePatternTexture = false;
		edgeThickness = 1.0;
		edgeStrength = 3.0;
		downSampleRatio = 2;
		pulsePeriod = 0;

        constructor(resolution?: THREE.Vector2, scene: THREE.Scene, camera: THREE.Camera, selectedObjects?: THREE.Object3D[])
        
        render(renderer, writeBuffer, readBuffer, deltaTime, maskActive)
        setSize(width: number, height: number)
        dispose()
        changeVisibilityOfSelectedObjects(bVisible)
        updateTextureMatrix()
        getPerpareMaskMaterial()
        getEdgeDetectionMaterial()
        getSeperableBlurMaterial()
        getOverlayMaterial()

    }
}