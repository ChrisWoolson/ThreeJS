//import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { scene } from "../main.js";
import { Object3D } from "three";
import { Billboard } from "./Billboard.js";
import { Vec3 } from 'cannon-es';

//loader
const loader = new GLTFLoader();

//billboard list
export const billboardList = []

//objectGLTFs
const skyGeometry = new THREE.SphereGeometry(100, 100, 100);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x77b5fe });
const carGLTF = 'Textures/Helicopter/Helicopter.gltf';

//objects
export var car = new Object3D();
var billboard = new Billboard(new Vec3(0,10,10), 10, 10, "Poop");
export const sky = new THREE.Mesh(skyGeometry, skyMaterial);

export const objectsInit = async () => {

    loader.load(carGLTF, (gltf)=>{
        car = gltf.scene;
        car.scale.set(.2,.2,.2);
        scene.add(gltf.scene);
        //rotate object 90 degrees
        
    })
    car.rotation.x = Math.PI/2;
    car.rotation.y = Math.PI/2;
    sky.material.side = THREE.BackSide;
    
    //add billboardslsit  to scene
    billboardList.push(billboard);

    for (let i = 0; i < billboardList.length; i++) {
        scene.add(billboardList[i].mesh);
    }
    

    //scene.add(sky)
}