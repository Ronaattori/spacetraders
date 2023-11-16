declare module "three/addons/controls/MapControls" {
    import * as THREE from 'three';
    import type { OrbitControls } from "three/addons/controls/OrbitControls"

    export class MapControls extends OrbitControls {
        screenSpacePanning = false
        mouseButtons = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE };
		touches = { ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE };

        constructor(object: THREE.Camera, domElement?: HTMLElement)
    }
}