import * as THREE from 'three';

let scene, camera, renderer, cube;

function init() {
    scene = new THREE.Scene();

    // create a cube
    const geometry = new THREE.SphereGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // create a renderer and add it to the DOM
    const canvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // create a light effect that will illuminate the cube
    const pointLight = new THREE.PointLight(0xffffff, 5, 100);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true; // Enable shadow casting for the light
    scene.add(pointLight);


    // create a persepective cameraa and adjust the initial position away from cube
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 150; // Adjust the initial camera position
    scene.add(camera);
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

import './style.css';
import javascriptLogo from './javascript.svg';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector('#counter'));
