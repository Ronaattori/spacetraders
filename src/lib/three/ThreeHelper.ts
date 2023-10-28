import { SphereGeometry, type Camera, Mesh, type MeshBasicMaterialParameters, type Scene, MeshBasicMaterial, WebGLRenderer, TextureLoader, Vector2, Raycaster, Line, Vector3, BufferGeometry, CircleGeometry, LineBasicMaterial, Group, LatheGeometry, ConeGeometry, type Intersection } from "three";
import { randFloat, randInt } from "three/src/math/MathUtils";
// @ts-ignore
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
// @ts-ignore
import { MapControls } from 'three/addons/controls/MapControls'
import { ExtendedMesh } from "./objects/ExtendedMesh";

export class ThreeHelper {
    scene: Scene;
    camera: Camera;
    pointer: Vector2;
    
    renderer = new WebGLRenderer();
    css2dRenderer;
    textureLoader = new TextureLoader();
    raycaster = new Raycaster();
    
    hovered: Record<string, ExtendedMesh> = {}
    
    constructor(scene: Scene, camera: Camera, pointer: Vector2) {
        this.scene = scene;
        this.camera = camera;
        this.pointer = pointer; // This needs to be kept up to date outside this class (onmousemove event)
        this.animate = this.animate.bind(this); // I don't quite understand the animation loop yet, but this is needed

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        window.addEventListener("resize", this.onResize);
        this.renderer.domElement.addEventListener("pointermove", this.onPointerMove);
        
        // Prepare the label renderer
        const labelRenderer = new CSS2DRenderer()
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        this.css2dRenderer = labelRenderer

        // Camera movement handling
        const controls = new MapControls(camera, this.renderer.domElement)
        controls.enableDamping = true;
    }

    animate() {
        requestAnimationFrame(this.animate);

        // Call all onRender functions
        for (const mesh of this.getMeshes()) {
            mesh.onRender.forEach(action => {
                if (!action.skip) action.action?.()
            })
        }

        this.renderer.render( this.scene, this.camera );
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
            this.hovered[key].onPointerOut.forEach(action => action.action())
            delete this.hovered[key]
        }
        
        for (const hit of intersects) {
            const uuid = hit.object.uuid
            // Mark an object as hovered and run its onPointerEnters
            if (!this.hovered[uuid]) {
                const mesh = hit.object as ExtendedMesh
                this.hovered[uuid] = mesh
                mesh.onPointerEnter.forEach(action => action.action())
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

    createCone(parameters?: MeshBasicMaterialParameters) {
        const geometry = new ConeGeometry(2, 5, 32)
        const material = new MeshBasicMaterial(parameters);
        const cone = new Mesh( geometry, material );
        return cone;
    }

    setMeshColor(mesh: Mesh, color: number | "random") {
        const material = mesh.material as MeshBasicMaterial
        const _color = color == "random" ? Math.random() * 0xffffff : color
        material.color.set(_color);
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