declare module "three/examples/jsm/postprocessing/BloomPass" {
    class BloomPass extends Pass {
        constructor(strength = 1, kernelSize = 25, sigma = 4)
        
        setSize(width: number, height: number)
        render(renderer, writeBuffer, readBuffer, deltaTime, maskActive)
        dispose()
    }
}