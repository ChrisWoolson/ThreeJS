//npx vite to run
import * as THREE from 'three';
import {
    car,
    billboardList,
    objectsInit,
} from './Game/objects.js';
import {
    groundBody,
    carBody,
    createPhysicsWorld,
    moveBody,
    syncPhysics,
} from './Physics/physicsWorld.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import { Billboard } from './Game/Billboard.js';
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const orbitControls = new OrbitControls( camera, renderer.domElement );
const light = new THREE.AmbientLight( 0xffffff, 10);
scene.add( light );

objectsInit();
createPhysicsWorld(billboardList, scene);



function cameraUpdate(){
    var offset = new THREE.Vector3(20, 15, 0)

    orbitControls.target.copy(car.position);
    offset.applyQuaternion(carBody.quaternion);
    camera.position.copy(car.position).add(offset)
    camera.lookAt(carBody.position)
    orbitControls.update();
}

function animate() {

	requestAnimationFrame( animate );
    syncPhysics(car, billboardList);
    moveBody();
    cameraUpdate();
	renderer.render( scene, camera );
}

animate();