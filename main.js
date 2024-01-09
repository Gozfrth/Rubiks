import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';

const materials = [
    new THREE.MeshBasicMaterial({color: 0xff0000}), // red
    new THREE.MeshBasicMaterial({color: 0xFFA500}), // orange
    new THREE.MeshBasicMaterial({color: 0x0000ff}), // blue
    new THREE.MeshBasicMaterial({color: 0x00ff00}), // green
    new THREE.MeshBasicMaterial({color: 0xffffff}), // white
    new THREE.MeshBasicMaterial({color: 0xffff00}), // yellow
  ];

class Cubie {
    constructor( l, r, u, d, f, b ){
        this.l = l;
        this.r = r;
        this.u = u;
        this.d = d;
        this.f = f;
        this.b = b;
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.geometry.translate( this.l? -2:this.r?2:0, this.u?2: this.d?-2:0, this.f?-2:this.b?2:0);
        this.cube = new THREE.Mesh( this.geometry, materials );
        scene.add(this.cube);
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerWidth, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight  );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x555555 });
const cube = new THREE.Mesh( geometry, material );
let cubes = new Array(3);

for (let i = 0; i < 3; i++) {
    cubes[i] = new Array(3);

    for (let j = 0; j < 3; j++) {
        cubes[i][j] = new Array(3);

        for (let k = 0; k < 3; k++) {
            let l = i === 0;
            let r = i === 1;
            let f = j === 0;
            let b = j === 1;
            let u = k === 0;
            let d = k === 1;

            cubes[i][j][k] = new Cubie(l, r, u, d, f, b);
        }
    }
}

const group = new THREE.Group();
let temps = new Array(3);
for (let i = 0; i < 3; i++) {
    temps[i] = new Array(3);
}

function L() {
    console.log(cubes);

    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            temps[i][k] = cubes[0][i][k].cube
            group.add(temps[i][k]);
        }
    }
    
    const targetRotation = { x: group.rotation.x + Math.PI / 2 };
    
    new TWEEN.Tween(group.rotation)
        .to(targetRotation, 1000)
        .start();
    
    scene.add(group)
}


function J() {
    console.log(cubes);

    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            group.add(cubes[1][i][k].cube);
        }
    }
    
    const targetRotation = { x: group.rotation.x + Math.PI / 2 };
    
    new TWEEN.Tween(group.rotation)
        .to(targetRotation, 1000)
        .start();
    
    scene.add(group)
}

function U() {
    console.log(cubes);

    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            group.add(cubes[i][k][0].cube);
        }
    }
    
    const targetRotation = { y: group.rotation.y + Math.PI / 2 };
    
    new TWEEN.Tween(group.rotation)
        .to(targetRotation, 1000)
        .start();
    
    scene.add(group)
}
document.body.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'l':
            L();
            break;
        case 'j':
            J();
            break;
        case 'u':
            U();
            break;
    }
});


// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector3( -10, 0, 0, ) );
// points.push( new THREE.Vector3( 0, 10, 0, ) );
// points.push( new THREE.Vector3( 10, 0, 0, ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );
// scene.add(line);
// renderer.render( scene, camera );

camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );
controls.update();

function animate() {
    requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    TWEEN.update();
    renderer.render( scene, camera );
}

animate();