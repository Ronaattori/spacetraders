import { SphereGeometry, type Camera, Mesh, type MeshBasicMaterialParameters, type Scene, MeshBasicMaterial, WebGLRenderer, TextureLoader, Vector2, Raycaster, Line, Vector3, BufferGeometry, CircleGeometry, LineBasicMaterial, Group } from "three";
import { randFloat, randInt } from "three/src/math/MathUtils";
// @ts-ignore
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
// @ts-ignore
import { RGBELoader } from 'three/addons/loaders/RGBELoader'

type RunOnAnimateAction = {
    action: () => void,
    skip: boolean
}
type LookForIntersectAction = {
    object: Mesh,
    action: () => void,
    onLeave?: () => void,
    skip?: boolean    
}

export class ThreeHelper {
    scene: Scene;
    camera: Camera;
    pointer: Vector2;

    renderer = new WebGLRenderer();
    textureLoader = new TextureLoader();
    gltfLoader = new GLTFLoader();
    rgbeLoader = new RGBELoader();
    raycaster = new Raycaster();
    
    runOnAnimate: RunOnAnimateAction[] = [];
    lookForIntersect: LookForIntersectAction[] = [];
    private lookForIntersectsActive: LookForIntersectAction[] = [];


    constructor(scene: Scene, camera: Camera, pointer: Vector2) {
        this.scene = scene;
        this.camera = camera;
        this.pointer = pointer; // This needs to be kept up to date outside this class (onmousemove event)
        this.animate = this.animate.bind(this); // I don't quite understand the animation loop yet, but this is needed

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        window.addEventListener("resize", () => {
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        });
    }

    animate() {
        requestAnimationFrame(this.animate);
        for (const action of this.runOnAnimate) {
            if (action.skip) continue;
            action.action();
        }

        // Handle mouseover stuff
        this.raycaster.setFromCamera( this.pointer, this.camera );
        const currentlyActive:LookForIntersectAction[] = []
        for (const action of this.lookForIntersect) {
            const intersects = this.raycaster.intersectObject(action.object);
            if (intersects.length == 0) continue
            action.action();

            currentlyActive.push(action)
            if (!this.lookForIntersectsActive.includes(action)) {
                this.lookForIntersectsActive.push(action)        
            }
        }
        // And run the onLeave of actions that weren't active anymore
        this.lookForIntersectsActive = this.lookForIntersectsActive.filter(action => {
            if (currentlyActive.includes(action)) {
                return true
            }
            action.onLeave?.()
            return false
        });

        this.renderer.render( this.scene, this.camera );
    }
    
    onMouseOver(mesh: Mesh, onMouseOver: () => void, onLeave?: () => void) {
        const action: LookForIntersectAction = {
            object: mesh,
            action: onMouseOver,
            onLeave: onLeave
        }
        this.lookForIntersect.push(action)
        return action;
    }
    addOrbit(mesh: Mesh, radius: number, speed: number) {
        const x = mesh.position.x;
        const z = mesh.position.z
        let angle = randInt(0, 200) 

        // Randomize the speed a bit
        // TODO: Implement a proper way to offset waypoints
        speed += randFloat(0.0001, 0.001)

        const action: RunOnAnimateAction = {
            skip: false,
            action: () => {
                angle += speed
                mesh.position.x = x + radius * Math.cos(angle)
                mesh.position.z = z + radius * Math.sin(angle)
            }
        }
        this.runOnAnimate.push(action)
        return action;
    }
    addRotation(mesh: Mesh, axis: "x" | "y", perFrame: number) {
        const action: RunOnAnimateAction = {
            skip: false,
            action: () => mesh.rotation[axis] += perFrame
        }
        this.runOnAnimate.push(action);
        return action;
    }

    createSphere(parameters?: MeshBasicMaterialParameters) {
        const geometry = new SphereGeometry( 1, 32, 32 );
        const material = new MeshBasicMaterial(parameters);
        const ball = new Mesh( geometry, material );
        return ball;
    }
    
    setMeshColor(mesh: Mesh, color: number | "random") {
        const material = mesh.material as MeshBasicMaterial
        const _color = color == "random" ? Math.random() * 0xffffff : color
        material.color.set(_color);
    }
}