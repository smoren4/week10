import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getFirstObjectWithName } from './RayCastHelper.js';

// var width = window.innerWidth - window.innerWidth/3;
var width = window.innerWidth;
var height = window.innerHeight;


// 1: Set up the scene

var scene = new THREE.Scene();

// 2: Add a camera
var camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
camera.position.z = 8;
camera.position.y = 3;
camera.rotation.x = -0.1;



// 3: create a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#141414");
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);


//*****************OBJECTS************** */
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({color: 0x0000ff, metalness: 0.9, roughness: 0});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);
cube.name = "cube";

const cubeX = 0;
const cubeY = 2;
const cubeZ = -2;
cube.position.set(cubeX,cubeY,cubeZ);
cube.scale.x = 2;



//add plane
const geometryPlane = new THREE.PlaneGeometry( 1, 1 );
const materialPlane = new THREE.MeshLambertMaterial( {color: "#61baff", side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialPlane);
scene.add( plane );
plane.name = "imageCube";
plane.rotation.x = THREE.MathUtils.degToRad(90);
plane.scale.x = 40;     
plane.scale.y = 40;


//ADD BIRD MODEL
var bird;
//declare variables for animation
var mixer;             // Three.JS AnimationMixer
var bird_anim_FLY;   // Animation FLY
// adding a 3D model
const gltfLoader = new GLTFLoader();
gltfLoader.load('media/models/phoenix_bird.glb', (gltf) => {

    bird = gltf.scene;
    bird.scale.set(0.01,0.01,0.01);
    bird.position.set(-5,5,-10);
    scene.add(bird);
    
    //ANIMATION MIXER
    mixer = new THREE.AnimationMixer( bird );
    //applying animations
    bird_anim_FLY = gltf.animations[ 0] ; // first animation
    mixer.clipAction( bird_anim_FLY).play();
});




//*************LIGHTS *************//

var lightSize = 10;
// 5: Add lighting to the scene
var pointLight = new THREE.PointLight(0xFFFFF,lightSize,200)
pointLight.position.set(cubeX,cubeY+2,cubeZ);
scene.add(pointLight);

//Add light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, lightSize);
// scene.add(pointLightHelper);


//add ambient light
var ambientLight = new THREE.AmbientLight(0x404040, 2);
// scene.add(ambientLight);

//add directional light
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
directionalLight.target.position.set(1,0,-1);

//add directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

// Adding Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
// controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;


//resize window
window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
       
        camera.updateProjectionMatrix();
});



const clock = new THREE.Clock();
// FINAL: Render the scene
function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    controls.update();

    //update mixer
    if(mixer){
        mixer.update(clock.getDelta());
    }

    // rotate bird objecct
    if(bird){
        bird.rotation.y += 0.01;
    }


    renderer.render(scene,camera);
}

animate();
















// //add event listener to cube
// document.addEventListener('click', onClick);

// //function called once a click is detected anywhere on the screen
// function onClick(){
//     const obj = getFirstObjectWithName(event, window, camera, scene, cube.name);
//     if(obj != null){
//         console.log("Cube clicked");
//         cube.material.color.set("#30ff49");
//     }

//     const obj2 = getFirstObjectWithName(event, window, camera, scene, "bird");
//     if(obj2 != null){
//         console.log("Bird clicked");
//         cube.material.color.set("#30ff49");
//     }
// }
