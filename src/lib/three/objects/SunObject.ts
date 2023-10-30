import * as THREE from "three";
import { ExtendedMesh } from "./ExtendedMesh";
import type { ThreeSystem } from "../ThreeSystem";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";

export class SunObject extends ExtendedMesh {
    system: ThreeSystem;

    constructor(system: ThreeSystem, radius: number, meshParamenters?: THREE.MeshStandardMaterialParameters) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshStandardMaterial(meshParamenters);
        super(geometry, material)

        this.system = system;

        const pointLight = new THREE.PointLight(0xffff99, 50, 0, 0.4)
        this.add(pointLight)
        // const helper = new THREE.PointLightHelper(pointLight)

        // material.emissive = new THREE.Color(0xffff00)
        // const bloom = new BloomPass()
        // console.log(bloom)
        // this.system.threeHelper.effectComposer.addPass(bloom)
    }
}