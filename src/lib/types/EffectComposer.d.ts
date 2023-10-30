declare module "three/examples/jsm/postprocessing/EffectComposer" {
    import * as THREE from "three"
    class EffectComposer {
        passes: Array
        readBuffer: THREE.WebGLRenderTarget
        renderer: THREE.WebGLRenderer
        renderToScreen: boolean
        writeBuffer: THREE.WebGLRenderTarget

        constructor(renderer: THREE.WebGLRenderer, renderTarget?: THREE.WebGLRenderTarget)
        
        addPass(pass: Pass)
        dispose(): void
        insertPass(pass: Pass, index: number)
        isLastEnabledPass(passIndex: number): boolean
        removePass(pass: Pass)
        render(deltaTime?: number): void
        reset(renderTarget: THREE.WebGLRenderTarget): void
        setPixelRation(pixelRation: number): void
        setSize(width: number, height: number): void
        swapBuffers(): void

    }
}