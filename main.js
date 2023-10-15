let scene, camera, renderer, cube;


function init(){
    // const { render } = require("react-dom/cjs/react-dom.production.min");

    scene = new THREE.Scene();
    
    // create a camera that has a 75 degree vertical field of view, 
    //                            an aspect ratio that matches the browser window, 
    //                            and will render objects between the near and far clipping planes
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // create a renderer that will render the scene and camera using anti-aliasing to smooth out the edges
    renderer = new THREE.WebGLRenderer({antialias: true});
    
    // set canvas size that renderer takes
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // append renderer to the body
    document.body.appendChild(renderer.domElement);
    
    // create a box and add it to the scene
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const texture = new THREE.TextureLoader().load('textures/crate.gif');
    const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    // const material = new THREE.MeshBasicMaterial( { map:texture } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    // move the camera out a bit so that we can see the cube
    camera.position.z = 5;
}

function animate(){
    // create a loop that renders the scene every time the screen is refreshed
    requestAnimationFrame(animate);

    // rotate the cube a bit on each frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // render both the scene and the camera
    renderer.render(scene, camera);
}

function onWindowResize(){
    // update the camera aspect ratio and renderer canvas size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// call onWindowResize() when the browser window is resized so it stays centered
window.addEventListener('resize', onWindowResize, false);

// window.onload = function() {
//     alert("hi");
// };

init();
animate();