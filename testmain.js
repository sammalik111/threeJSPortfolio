
// let scene, camera, renderer, cube;

// function init() {
//     scene = new THREE.Scene();

//     // create a cube
//     const geometry = new THREE.SphereGeometry(50, 50, 50);
//     const material = new THREE.MeshBasicMaterial({ color: 0xaa0000 });
//     cube = new THREE.Mesh(geometry, material);
//     cube.scale.set(0.5,0.5,0.5);
//     scene.add(cube);

    // Load your OBJ file using OBJLoader
    // const loader = new OBJLoader();
    // loader.load('_changes.obj', function (object) {
    //     // Create a Mesh and add it to your three.js scene
    //     object.scale.set(0.09, 0.09, 0.09);
    //     const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    //     object.traverse(function (child) {
    //         if (child instanceof THREE.Mesh) {
    //             child.material = material;
    //         }
    //     });

    //     // Set the desired rotation for the object
    //     object.rotation.set(-Math.PI / 2, 0, -Math.PI / 2); // Rotate 90 degrees about the Y-axis

    //     // Assuming you have your object loaded and stored in the 'object' variable
    //     const geometry = object.geometry;


    //     object.position.set(-30, -80, 0);

    //     // Add the object to the scene
    //     scene.add(object);

    // });



//     // Call the function to load and process PLY file
//     loadPLYFile();

//     // create a light effect that will illuminate the cube
//     const pointLight = new THREE.PointLight(0xffffff, 1, 100);
//     pointLight.position.set(0, 500, 500);
//     scene.add(pointLight);

//     // create a perspective camera and adjust the initial position away from cube
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 150; // Adjust the initial camera position
//     let cameratarget = new THREE.Vector3(0, 0, 0); // Declare cameratarget
//     scene.add(camera);

//     // create a renderer and add it to the DOM
//     const canvas = document.querySelector('.webgl');
//     renderer = new THREE.WebGLRenderer({ canvas });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     renderer.render(scene, camera);
// }

// function loadPLYFile() {
//     // Instantiate a new PLYLoader directly
//     const loader = new PLYLoader();
//     // alert("loaded");
//     loader.load('model/mean_model_tri.ply', function (geometry) {
//         // Process the geometry here
//         // ...
//         console.log('PLY Loaded', geometry);
//         // Create material and mesh
//         var material = new THREE.MeshLambertMaterial({ 
//             color: 0xffffff, 
//             specular: 0xaaaaaa, 
//             shininess: 20, 
//             shading: THREE.SmoothShading
//         });
//         var mesh = new THREE.Mesh(geometry, material);
//         mesh.position.set(0, 0, 0); // Adjust position as needed
//         mesh.rotation.set(0, 0, 0); // Adjust rotation as needed
//         mesh.scale.set(0.9, 0.9, 0.9); // Adjust scale as needed
//         scene.add(mesh);
//     }, undefined, function (error) {
//         console.error(error);
//     });
// }

// function animate() {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false);

// init();
// animate(); // Uncomment this line to start the animation loop