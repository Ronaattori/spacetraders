import * as THREE from 'three';
type Action = {
    action: () => void,
    skip?: boolean
}
export class ExtendedMesh extends THREE.Mesh {
    onRender: Action[] = [];
    onPointerEnter: Action[] = [];
    onPointerOut: Action[] = [];
    onClick: Action[] = [];
    onResize: Action[] = [];

    constructor() {
        super()
    }
}