declare module "three/addons/renderers/CSS2DRenderer" {
    import type { Camera, Scene, Vector2 } from "three"
    type CSS2DRendererParameters = {
        element?: HTMLElement        
    }
    type CSS2DRendererSize = {
        width: number,
        height: number
    }

    class CSS2DRenderer {
        domElement: HTMLElement

        constructor(parameters?: CSS2DRendererParameters)

        getSize(): CSS2DRendererSize
        render(scene: Scene, camera: Camera): undefined
        setSize(width: number, height: number): undefined
    }

    class CSS2DObject extends THREE.Object3D {
        isCSS2DObject: boolean
        element: HTMLElement
        center: Vector2  

        constructor(element?:HTMLElement)
    }
}