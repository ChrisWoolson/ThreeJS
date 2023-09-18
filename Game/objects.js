//import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { scene } from "../main.js";
import { Object3D } from "three";
//loader
const loader = new GLTFLoader();


//objectGLTFs
const skyGeometry = new THREE.SphereGeometry(100, 100, 100);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x77b5fe });
const carGLTF = 'Textures/Car/Nissan.gltf';

//objects
export var car = new Object3D();
export const sky = new THREE.Mesh(skyGeometry, skyMaterial);

export const objectsInit = async () => {

    loader.load(carGLTF, (gltf)=>{
        car = gltf.scene;
        car.scale.set(4,4,4);
        scene.add(gltf.scene);
    })
    sky.material.side = THREE.BackSide;
    //scene.add(sky)
}