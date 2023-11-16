declare module "three/addons/controls/OrbitControls" {
    import * as THREE from 'three';

    export class OrbitControls {
        autoRotate: boolean
        autoRotateSpeed = 2.0
        dampingFactor = 0.05
        domElement: HTMLElement
        enabled = true
        enableDamping = false
        enablePan = true
        enableRotate = true
        enableZoom: boolean
        keyPanSpeed = 7.0
        keys: object
        
        maxAzimuthAngle = Infinity
        maxDistance = Infinity
        maxPolarAngle = Math.PI
        maxZoom = Infinity
        minTargetRadius = 0
        maxTargetRadius = Infinity
        minAzimuthAngle = Infinity
        minDistance = 0
        minPolarAngle = 0
        minZoom = 0
        mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        object: THREE.Camera
        panSpeed = 1
        position0: THREE.Vector3
        rotateSpeed = 1
        screenSpacePanning = true
        target0: THREE.Vector3
        target: THREE.Vector3
        cursor: THREE.Vector3
        touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        }
        zoom0: number
        zoomSpeed = 1
        zoomToCursor = false

        constructor(object: THREE.Camera, domElement?: HTMLElement)

        dispose()
        getAzimuthalAngle(): any
        getPolarAngle(): any
        getDistance(): number
        listenToKeyEvents(domElement: HTMLElement)
        reset()
        saveState()
        stopListenToKeyEvents()
        update(deltatime?: number)
        
    }
}