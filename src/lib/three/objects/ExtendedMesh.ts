import * as THREE from 'three';

class ActionArray extends Array<Action> {
    runAll() {
        this.forEach(action => {
            if (!action.skip) action.action()
        })
    }
}
type Action = {
    action: () => void,
    skip?: boolean
}

export class ExtendedMesh extends THREE.Mesh {
    onRender = new ActionArray()
    onPointerEnter = new ActionArray()
    onPointerOut = new ActionArray()
    onClick = new ActionArray()
    onResize = new ActionArray()

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
        super(geometry, material)
    }
}