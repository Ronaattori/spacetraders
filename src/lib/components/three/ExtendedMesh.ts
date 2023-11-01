import type { Subscriber } from 'svelte/motion';
import { writable } from 'svelte/store';
import * as THREE from 'three';

// Create a store whichs subscribe skips the initial value
// We only need it to send signals to subscribers
function createEventHandler() {
    const {set, update, subscribe} = writable<number>(0);
    return {
        subscribe: (run: Subscriber<any>) => {
            return subscribe(state => {
                if (state != 0) run(state)
            });
        },
        trigger: () => {
            update(x => ++x)
        }
    }
}

export class ExtendedMesh extends THREE.Mesh {
    // onRender = writable(false)
    pointerenter = createEventHandler()
    pointerout = createEventHandler()
    click = createEventHandler()
    resize = createEventHandler()

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
        super(geometry, material)
    }
}