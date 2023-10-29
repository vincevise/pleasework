import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';







/////////////////////////////////////////////////////
// Scene
var scene = new THREE.Scene();




/////////////////////////////////////////////////////
// Camera
var width = window.innerWidth;
var height = window.innerHeight;
var viewAngle = 45;
var nearCliping = 0.1;
var farClipping = 9999;

var camera = new THREE.PerspectiveCamera(
  viewAngle,
  width / height,
  nearCliping,
  farClipping
);
camera.position.set(0, 15, 65);

// Colada Loader
const loader = new ColladaLoader()
loader.load("./residence5.dae",function (result) {
  scene.add(result.scene);
  result.scene.position.set(10, 20, 0)
})

// GLTF Model
const loadergltf = new GLTFLoader();
loadergltf.load(
	// resource URL
	'./scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( error);

	}
)


///////////////////////////////////////////////////
// Geometry + Metrial = Mesh
const geometry = new THREE.PlaneGeometry(20, 20);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.set(Math.PI/2, 0, 0);
scene.add(plane);

// cube 1

const cubeGeo = new THREE.BoxGeometry(20, 10, 1);
const cubeMat = new THREE.MeshStandardMaterial({ color: "red" });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.set(0, 5, -9.5);

scene.add(cube)


const cubeGeo1 = new THREE.BoxGeometry(20, 10, 1);
const cubeMat1 = new THREE.MeshStandardMaterial({ 
  color: "blue" ,
  side: THREE.DoubleSide
});
const cube1 = new THREE.Mesh(cubeGeo1, cubeMat1);
cube1.position.set(0, 5, 9.5);
// scene.add(cube1)


// Circle
const circleGeometry = new THREE.SphereGeometry(5, 32);
const circleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide 
});

const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(0, 20, 0);
// scene.add(circle)

const g1 = new THREE.Group();
g1.add(plane, cube1, circle);

scene.add(g1);

///////////////////////////////////////////////////
// RENDERER
var renderer = new THREE.WebGLRenderer({ antialize: true });
renderer.setSize(width, height);
renderer.setClearColor( 0xffffff, 0);



// Hemisphere Light
// const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x000020, 1);
// const directionalLight = new THREE.DirectionalLight(0xffffbb, 0x000020, 0.5);
// directionalLight.position.set(0,10,10)
// // scene.add(directionalLight)
// scene.add(hemisphereLight)

const light1 = new THREE.PointLight(0xffffff, 20, 100);
light1.position.set(50, 30, 50)
scene.add(light1)
 

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

var element = document.getElementById("container");
element.appendChild(renderer.domElement);

function animate() {
  controls.update();
  // plane.rotation.x += 0.01
  // plane.rotation.y += 0.01
  // plane.rotation.z += 0.01

  // g1.rotation.x += 0.01
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
