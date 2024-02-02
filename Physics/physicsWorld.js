import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import {camera} from '../main.js'
import CannonDebugger from 'cannon-es-debugger';

var cannonDebugger

export const world = new CANNON.World({
    gravity: new CANNON.Vec3(0,-9.82,0)
})

export const groundBody = new CANNON.Body({
    type: CANNON.Body.KINEMATIC,
    shape: new CANNON.Plane(),
})

export const carBody = new CANNON.Body({
    mass: 7,
    shape: new CANNON.Box(new CANNON.Vec3(4,4,4)),
    fixedRotation: true,
})

const billBoardListBodies = []

export function createPhysicsWorld(billboardList, scene){
    cannonDebugger = new CannonDebugger(scene, world);

    groundBody.quaternion.setFromEuler(-Math.PI/2,0,0)
    world.addBody(carBody)
    carBody.position.y = 10
    world.addBody(groundBody)

    for (let i = 0; i < billboardList.length; i++) {
        var billboardBody = new CANNON.Body({
            mass: 3,
            shape: new CANNON.Box(new CANNON.Vec3(billboardList[i].width/2, billboardList[i].height/2, 1)),
            position: billboardList[i].location,
        })
        billBoardListBodies.push(billboardBody)
        world.addBody(billboardBody)
    }

}

export function syncPhysics(car, billboardList){
    world.fixedStep();
    cannonDebugger.update();

    car.position.copy(carBody.position);
    car.quaternion.copy(carBody.quaternion);

    for (let i = 0; i < billboardList.length; i++) {
        billboardList[i].mesh.position.copy(billBoardListBodies[i].position);
        billboardList[i].mesh.quaternion.copy(billBoardListBodies[i].quaternion);
    }
}

// MOVEMENT CONTROLS
var bodyControls = {
    wKey: false,
    aKey: false,
    sKey: false,
    dKey: false,
    direction: 0,
    speed: 0,
}

export function moveBody(){

    if(bodyControls.wKey){
        bodyControls.speed+=0.04;
    }
    if(bodyControls.sKey){
        bodyControls.speed-=0.04;
    }
    if(bodyControls.aKey){
        carBody.quaternion.setFromEuler(bodyControls.direction+=0.05, 0, 0)
    }
    if(bodyControls.dKey){
        carBody.quaternion.setFromEuler(bodyControls.direction-=0.05,0, 0)
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
    
    carBody.position.z -= Math.sin(-bodyControls.direction)*bodyControls.speed;
    carBody.position.x -= Math.cos(-bodyControls.direction)*bodyControls.speed;
    camera.position.z -= Math.sin(-bodyControls.direction)*bodyControls.speed;
    camera.position.x -= Math.cos(-bodyControls.direction)*bodyControls.speed;
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

