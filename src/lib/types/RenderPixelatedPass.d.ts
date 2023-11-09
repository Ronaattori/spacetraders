declare module "three/examples/jsm/postprocessing/RenderPixelatedPass" {
    class RenderPixelatedPass extends Pass {
        constructor(pixelSize: number, scene: THREE.Scene, camera: THREE.Camera, options = {})
        
        setPixelSize(pixelSize: number)
        dispose()
        setSize(width: number, height: number)
        createPixelatedMaterial(): THREE.ShaderMaterial
        
    }
}