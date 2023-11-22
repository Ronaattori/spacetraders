import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer';

export class MouseAction {
    anchor: HTMLElement

    constructor(target: MouseEvent | HTMLElement | THREE.Object3D) {
        
        this.anchor = document.createElement("div");

        // Create a new CSS2DObject and anchor it to the Object3D
        if (target instanceof THREE.Object3D) {
            const css2dObject = new CSS2DObject();
            target.add(css2dObject)
            this.anchor = css2dObject.element
        // Use the event.target as the anchor
        } else if (target instanceof MouseEvent) {
            this.anchor = target.target as HTMLElement;
        // Use the actual target element as the anchor
        } else if (target instanceof HTMLElement) {
            this.anchor = target            
        }
    }
}