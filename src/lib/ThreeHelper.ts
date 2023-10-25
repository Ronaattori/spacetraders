import { SphereGeometry, type Camera, Mesh, type MeshBasicMaterialParameters, type Scene, MeshBasicMaterial, WebGLRenderer, TextureLoader, Vector2, Raycaster } from "three";
import munkki from "$lib/images/munkki.jpg"

export class ThreeHelper {
    scene: Scene;
    camera: Camera;
    pointer: Vector2;

    renderer = new WebGLRenderer();
    textureLoader = new TextureLoader();
    raycaster = new Raycaster();
    
    private runOnRender: Array<() => void> = []
    private lookForIntersect: Map<Mesh, () => void> = new Map();

    constructor(scene: Scene, camera: Camera, pointer: Vector2) {
        this.scene = scene;
        this.camera = camera;
        this.pointer = pointer; // This needs to be kept up to date outside this class (onmousemove event)
        this.animate = this.animate.bind(this); // I don't quite understand the animation loop yet, but this is needed

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        // const munkkiTexture = this.textureLoader.load(munkki)
        // this.ball = this.addBall({map: munkkiTexture})
        // this.rotateMesh(this.ball, "x", 0.001)
        // console.log(this.runOnRender)

    }
    animate() {
        requestAnimationFrame(this.animate);
        for (const func of this.runOnRender) {
            func();
        }

        // Handle mouseover stuff
        this.raycaster.setFromCamera( this.pointer, this.camera );
        for (const [mesh, func] of this.lookForIntersect) {
            const intersects = this.raycaster.intersectObject(mesh);
            if (intersects.length == 0) continue
            func();
        }
        this.renderer.render( this.scene, this.camera );
    }
    
    onMouseOver(mesh: Mesh, onMouseOver: () => void) {
        this.lookForIntersect.set(mesh, onMouseOver);
    }
    rotateMesh(mesh: Mesh, axis: "x" | "y", perFrame: number) {
        this.runOnRender.push(() => mesh.rotation[axis] += perFrame)
    }

    addBall(parameters?: MeshBasicMaterialParameters, runBeforeAdd?: (mesh: Mesh) => void) {
        const geometry = new SphereGeometry( 1, 32, 32 );
        const material = new MeshBasicMaterial(parameters);
        const ball = new Mesh( geometry, material );
        runBeforeAdd?.(ball);
        this.scene.add(ball);
        return ball;
    }
}