import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import {camera} from '../main.js'
export const world = new CANNON.World({
    gravity: new CANNON.Vec3(0,-9.82,0)
})

export const groundBody = new CANNON.Body({
    type: CANNON.Body.KINEMATIC,
    shape: new CANNON.Plane(),
})

export const carBody = new CANNON.Body({
    mass: 7,
    shape: new CANNON.Box(new CANNON.Vec3(4,3,11)),
    fixedRotation: true,
})

var bodyControls = {
    wKey: false,
    aKey: false,
    sKey: false,
    dKey: false,
    direction: 0,
    speed: 0,
}

export function createPhysicsWorld(){
    groundBody.quaternion.setFromEuler(-Math.PI/2,0,0)
    world.addBody(carBody)
    carBody.position.y = 10
    world.addBody(groundBody)
}

export function moveBody(){

    if(bodyControls.wKey){
        bodyControls.speed+=0.04;
    }
    if(bodyControls.sKey){
        bodyControls.speed-=0.04;
    }
    if(bodyControls.aKey){
        carBody.quaternion.setFromEuler(0,bodyControls.direction+=0.05,0)
    }
    if(bodyControls.dKey){
        carBody.quaternion.setFromEuler(0,bodyControls.direction-=0.05,0)
    }
    if(!bodyControls.wKey && !bodyControls.sKey){
        if(bodyControls.speed > 0){
            bodyControls.speed-=0.1;
        }
        else if(bodyControls.speed < 0){
            bodyControls.speed+=0.1;
        }
        if(Math.abs(bodyControls.speed) < 0.1){
            bodyControls.speed = 0;
        }
    }
    //console.log(carBody.quaternion)
    carBody.quaternion.setFromEuler(0,bodyControls.direction,0)
    
    carBody.position.x += Math.sin(bodyControls.direction)*bodyControls.speed;
    carBody.position.z += Math.cos(bodyControls.direction)*bodyControls.speed;
    camera.position.x += Math.sin(bodyControls.direction)*bodyControls.speed;
    camera.position.z += Math.cos(bodyControls.direction)*bodyControls.speed;
}

document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        bodyControls.wKey = true;
    } else if (keyCode == 83) {
        bodyControls.sKey = true;
    } else if (keyCode == 65) {
        bodyControls.aKey = true;
    } else if (keyCode == 68) {
        bodyControls.dKey = true;
    }
    moveBody();
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        bodyControls.wKey = false;
    } else if (keyCode == 83) {
        bodyControls.sKey = false;
    } else if (keyCode == 65) {
        bodyControls.aKey = false;
    } else if (keyCode == 68) {
        bodyControls.dKey = false;
    } 
    moveBody();
}

