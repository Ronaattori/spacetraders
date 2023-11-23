import type { Subscriber } from 'svelte/motion';
import { writable } from 'svelte/store';
import * as THREE from 'three';
import type { ThreeContext } from './contexts';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
import type { ComponentType } from 'svelte';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer';
import Tooltip from '$lib/components/common/Tooltip.svelte';
import InteractMenu, { type InteractMenuContent } from '$lib/components/common/InteractMenu.svelte';

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
    contextmenu = createEventHandler()
    resize = createEventHandler()
    
    glow = writable<number | null>();
    private outlinePass?: OutlinePass;

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material, context: ThreeContext) {
        super(geometry, material)
        this.context = context
        
        this.glow.subscribe(x => this.setGlow(x))
    }

    private setGlow(amount: number | null) {
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
    private createInteractMenu(content: InteractMenuContent) {
        let element = document.createElement("div");
        let component: InteractMenu | undefined = undefined;
        if (typeof content == "string") {
            element.innerText = content;
        } else {
            component = new InteractMenu({
                target: element,
                props: {
                    content,
                    absolute: false
                }
            });
        }
        let tooltip: CSS2DObject
        const create = () => {
            tooltip = new CSS2DObject(element);
            component?.show()
            tooltip.center.set(0.5, -0.2)
            this.add(tooltip);
        }
        const destroy = () => {
            component?.hide()
            tooltip?.removeFromParent()
        }
        return {
            create,
            destroy,
            component,
            element
        }
    }
    setTooltip(content: InteractMenuContent) {
        const { create, destroy, component } = this.createInteractMenu(content);
        this.pointerenter.subscribe(_ => {
            create()
        })
        this.pointerout.subscribe(_ => {
            destroy()
        })
    }
    setContextmenu(content: InteractMenuContent) {
        const { create, destroy, element, component } = this.createInteractMenu(content);
        element.style.pointerEvents = "auto";
        this.contextmenu.subscribe(_ => {
            create()
        })
        if (component) {
            component?.$on("mouseleave", () => {
                destroy()
            })
        } else {
            element.addEventListener("pointerout", () => {
                destroy() 
            })
        }
    }
    getSize() {
        const boundingBox = new THREE.Box3().setFromObject(this)
        const size = new THREE.Vector3()
        return boundingBox.getSize(size);
    }
}