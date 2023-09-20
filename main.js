//npx vite to run
import * as THREE from 'three';
import {
    car,
    objectsInit,
} from './Game/objects.js';
import {
    world,
    groundBody,
    carBody,
    createPhysicsWorld,
    moveBody,
} from './Physics/physicsWorld.js';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const orbitControls = new OrbitControls( camera, renderer.domElement );

// lighting and shadows 

const light = new THREE.AmbientLight( 0xffffff, 5); 
scene.add( light );

 

objectsInit();
createPhysicsWorld();

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
const cannonDebugger = new CannonDebugger(scene, world);

function syncPhysics(){
    world.fixedStep();
    cannonDebugger.update();

    car.position.copy(carBody.position);
    car.position.y-=2
    car.quaternion.copy(carBody.quaternion);
}

function cameraUpdate(){
    


    orbitControls.target = car.position;
    orbitControls.update();
}

function animate() {

	requestAnimationFrame( animate );
    syncPhysics();
    moveBody();
    cameraUpdate();
	renderer.render( scene, camera );
}

animate();