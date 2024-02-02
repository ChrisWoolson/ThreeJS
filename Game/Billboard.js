import * as THREE from 'three';
import { Raycaster } from 'three';
import { camera } from '../main.js';

const raycaster = new Raycaster();
export class Billboard{
  constructor(location, width, height, text){
      this.location = location;
      this.width = width;
      this.height = height;
      this.text = text;

      // Create an off-screen canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 200; // Set canvas width and height
      canvas.height = 128;

      // Draw text on the canvas
      context.fillStyle = '#3e515c'; // Background color
      context.fillRect(0, 0, canvas.width, canvas.height); // Fill the background
      context.fillStyle = '#FFFFFF'; // Text color
      context.font = '48px serif'; // Text style
      context.fillText(this.text, 10, 50); // Draw text

      // Create a texture from the canvas
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true; // Update the texture

      // Create geometry, material using the texture, and mesh
      this.geometry = new THREE.BoxGeometry(this.width, this.height, 2);
      const materials = [
        new THREE.MeshBasicMaterial({color: 0x496c82}), // Right side
        new THREE.MeshBasicMaterial({color: 0x496c82}), // Left side
        new THREE.MeshBasicMaterial({color: 0x496c82}), // Top side
        new THREE.MeshBasicMaterial({color: 0x496c82}), // Bottom side
        new THREE.MeshBasicMaterial({map: texture}),    // Front side (with text)
        new THREE.MeshBasicMaterial({color: 0x496c82}), // Back side
    ];

    // Create a mesh with geometry and materials
    this.mesh = new THREE.Mesh(this.geometry, materials);
    this.mesh.position.copy(this.location);
    this.mesh.rotation.x = 0;

      document.addEventListener('mousedown', onDocumentMouseDown, false);
  }
}
function onDocumentMouseDown( e ) {
    e.preventDefault();
    var intersects = raycaster.intersectObjects( scene.children, true );
    for( var i = 0; i < intersects.length; i++ ) {
      console.log("Intersected object");
    }
    console.log('detect')
  }
