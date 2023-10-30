import { SphereGeometry, type Camera, Mesh, type MeshBasicMaterialParameters, type Scene, MeshBasicMaterial, WebGLRenderer, TextureLoader, Vector2, Raycaster, Line, Vector3, BufferGeometry, CircleGeometry, LineBasicMaterial, Group, LatheGeometry, ConeGeometry, type Intersection, Object3D } from "three";
import { randFloat, randInt } from "three/src/math/MathUtils";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
// @ts-ignore
import { MapControls } from 'three/addons/controls/MapControls'
import { ExtendedMesh } from "./objects/ExtendedMesh";
import type { ComponentType } from "svelte";
import Tooltip from "$lib/components/Tooltip.svelte";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

export class ThreeHelper {
    scene: Scene;
    camera: Camera;
    pointer: Vector2;
    
    renderer = new WebGLRenderer();
    css2dRenderer;
    textureLoader = new TextureLoader();
    raycaster = new Raycaster();
    effectComposer;
    
    hovered: Record<string, ExtendedMesh | Object3D> = {}
    
    constructor(scene: Scene, camera: Camera, pointer: Vector2) {
        this.scene = scene;
        this.camera = camera;
        this.pointer = pointer; // This needs to be kept up to date outside this class (onmousemove event)
        this.animate = this.animate.bind(this); // I don't quite understand the animation loop yet, but this is needed

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        window.addEventListener("resize", this.onResize);
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("click", this.onClick);
        
        // Prepare the label renderer
        const labelRenderer = new CSS2DRenderer()
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        this.css2dRenderer = labelRenderer
        
        // Prepare the postprocessing composer
        // this.effectComposer = new EffectComposer(this.renderer)
        // const renderPass = new RenderPass(this.scene, this.camera)
        // this.effectComposer.addPass(renderPass)

        // Camera movement handling
        const controls = new MapControls(camera, this.renderer.domElement)
        controls.enableDamping = true;
    }

    animate() {
        requestAnimationFrame(this.animate);

        // Call all onRender functions
        for (const mesh of this.getMeshes()) {
            mesh.onRender.runAll()
        }

        this.renderer.render( this.scene, this.camera );
        // this.effectComposer.render()
        this.css2dRenderer.render( this.scene, this.camera );
    }

    getMeshes() {
        const meshes: ExtendedMesh[] = [];
        this.scene.traverse((obj) => {
            if (!(obj instanceof ExtendedMesh)) return;
            meshes.push(obj)
        })
        return meshes;
    }

    onResize() {
        this.css2dRenderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    onClick = (e: MouseEvent) => {
        for (const hit of Object.values(this.hovered)) {
            if (hit instanceof ExtendedMesh) hit.onClick.runAll();
        }
    }

    onPointerMove = (e: MouseEvent) => {
        // Update our pointers position
        const bounds = this.renderer.domElement.getBoundingClientRect()
        const wid = ((e.clientX - bounds.left) / window.innerWidth) * 2 - 1;
        const hei = -((e.clientY - bounds.top) / window.innerHeight) * 2 + 1;
        this.pointer.set(wid, hei)
        if (e.target != this.renderer.domElement) return;

        // Check what objects are currently under our cursor
        this.raycaster.setFromCamera(this.pointer, this.camera)
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)
        
        // If a previously mouseovered item isn't mouseovered anymore 
        for (const key of Object.keys(this.hovered)) {
            const hit = intersects.find(hit => hit.object.uuid == key)
            if (hit) continue;
            const hovered = this.hovered[key];
            if (hovered instanceof ExtendedMesh) hovered.onPointerOut.runAll()
            delete this.hovered[key]
        }
        
        for (const hit of intersects) {
            const uuid = hit.object.uuid
            // Mark an object as hovered and run its onPointerEnters
            if (!this.hovered[uuid]) {
                const mesh = hit.object
                this.hovered[uuid] = mesh
                if (mesh instanceof ExtendedMesh) mesh.onPointerEnter.runAll()
            }
        }
    }

    drawLine(from: Vector3, to: Vector3, color=0x8877ff) {
        const material = new LineBasicMaterial({color: color})
        const points = [from, to]
        const geometry = new BufferGeometry().setFromPoints(points)
        const line = new Line(geometry, material)
        this.scene.add(line)
    }

    setMeshColor(mesh: Mesh, color: number | "random") {
        const material = mesh.material as MeshBasicMaterial
        const _color = color == "random" ? Math.random() * 0xffffff : color
        material.color.set(_color);
    }
    addTooltip(mesh: ExtendedMesh, content: string | {component: ComponentType, props: any}) {
        let element = document.createElement("div");
        if (typeof content == "string") {
            element.innerText = content;
        } else {
            const component = new Tooltip({
                target: element,
                props: {
                    content: content
                }
            });
        }
        let tooltip: CSS2DObject
        mesh.onPointerEnter.push({
            action: () => {
                tooltip = new CSS2DObject(element)
                mesh.add(tooltip)
            }
        })
        mesh.onPointerOut.push({
            action: () => {
                tooltip?.removeFromParent()
            }
        })
    }
    addLabel(mesh: Mesh, content: string) {
        const labelDiv = document.createElement("div") 
        labelDiv.textContent = content
        labelDiv.style.color = "white"
        
        const label = new CSS2DObject(labelDiv)
        label.position.set(0, 0, 0)
        label.center.set(0, 0)
        mesh.add(label)
        return label;
    }
}