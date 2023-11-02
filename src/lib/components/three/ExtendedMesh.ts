import type { Subscriber } from 'svelte/motion';
import { writable } from 'svelte/store';
import * as THREE from 'three';
import type { ThreeContext } from './contexts';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';

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
    context: ThreeContext;

    // onRender = writable(false)
    pointerenter = createEventHandler()
    pointerout = createEventHandler()
    click = createEventHandler()
    resize = createEventHandler()
    
    glow = writable<number | null>();
    private outlinePass?: OutlinePass;

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material, context: ThreeContext) {
        super(geometry, material)
        this.context = context
        
        this.glow.subscribe(x => this.setGlow(x))
    }

    setGlow(amount: number | null) {
        if (amount) {
            this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.context.scene, this.context.camera);
            this.outlinePass.selectedObjects = [this];
            this.outlinePass.edgeThickness = 1
            this.outlinePass.edgeGlow = amount;
            this.context.effectComposer.addPass(this.outlinePass)
        } else {
            this.context.effectComposer.removePass(this.outlinePass)
        }
    }
}