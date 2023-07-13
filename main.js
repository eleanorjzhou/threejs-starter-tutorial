import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // GLTF loader for 3D models
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js'; // WebGL compatibility check

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 1000 ); // attributes: field of view, aspect ratio, near, far

const renderer = new THREE.WebGLRenderer({antialias:true}); // Anti-alias for the object or model
renderer.setSize( window.innerWidth, window.innerHeight ); // Set view size to window size
document.body.appendChild( renderer.domElement ); // Connect renderer to index.html

scene.background = new THREE.Color(0xdddddd); // Set background color for the scene

// Axes helper
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(5);
scene.add(gridHelper);



// Light
const AmbLight = new THREE.AmbientLight(0xffffff,0.5); // attributes: color, intensity
scene.add(AmbLight);

// White directional light
const dLight = new THREE.DirectionalLight( 0xffffff, 3 ); // attributes: color, intensity
dLight.position.set(5,5,4);
scene.add( dLight );

// Directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper( dLight, 1, 0xfcc203 ); // attributes: light, size, color
scene.add( directionalLightHelper );

// Camera helper
// const camHelper = new THREE.CameraHelper( camera );
// scene.add( camHelper );


// Shadow
renderer.shadowMap.enabled = true;
dLight.castShadow = true;
AmbLight.castShadow = true;
// Shadow settings
dLight.shadow.mapSize.width = 2000;
dLight.shadow.mapSize.height = 2000;
dLight.shadow.radius = 5;
dLight.shadow.blurSamples = 25;
const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera); // Shadow helper
scene.add(dLightShadowHelper);




// Camera settings
// camera.rotation.y = 45/180*Math.PI;
camera.position.set(2,3,2) // horizontal, vertical, depth


// Plane
const planeGeometry = new THREE.PlaneGeometry( 5, 5 );
const planeMaterial = new THREE.MeshStandardMaterial( { 
    color: 0xffffff,
    side: THREE.DoubleSide, 
    emissive: 0x000000, 
    roughness: 1,
    metalness: 0,
    reflectivity: 0.5,
    shadowSide: THREE.FrontSide,
 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.position.set(10,-10,1);
plane.rotation.set(-0.5*Math.PI,0,0);
plane.receiveShadow = true;
scene.add( plane );


// Controls
const controls = new OrbitControls(camera, renderer.domElement);


// Load 3D model

const loader = new GLTFLoader();

loader.load( '/models/baked_ham_lowpoly/scene.gltf', function ( gltf ) {

    const ham = gltf.scene;  // ham 3D object is loaded
    ham.scale.set(1, 1, 1);
    ham.position.set(0,0.34,0);

    // Make ham cast shadow
    ham.traverse(function(node) {
        if(node.isMesh){node.castShadow = true;}
    });

	scene.add( ham );
    

    renderer.render(scene, camera) // render the scene

}, undefined, function ( error ) {

	console.error( error );

} );



// WebGL compatibility check

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}


// Rendering the scene

function animate() {
	requestAnimationFrame( animate );
	
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update(); 

    renderer.render( scene, camera );
}
animate();

