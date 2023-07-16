# Getting Started with Three.js

For more Three.js tutorials, visit [sbcode.net](https://sbcode.net/threejs/)

## Installation

### Project structure
We need the following things to run our three.js code:

```
# index.html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script type="module" src="/main.js"></script>
	</body>
</html>
```

```
# main.js

import * as THREE from 'three';

```

```
public/ folder

Contains textures, audio, and 3D models

```

### Set up local development 

1. Install `Node.js` to load manage dependencies and run build tool: 
2. install `three.js` and the build tool Vite: `npm install --save three` and `npm install --save dev vite` or `npx vite`
3. To serve the app, simply run `npx vite`


### Addons
Addons do not need to be installed separately, but do need to be imported separately, for example:
```
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
```


## Scene
To set up a scene, first we need three things in `main.js`:
- `THREE.Scene`
- `THREE.PerspectiveCamera` 
- `THREE.WebGLRenderer`
```
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 1000 ); // attributes: field of view, aspect ratio, near, far

const renderer = new THREE.WebGLRenderer({antialias:true}); // Anti-alias for the object or model
renderer.setSize( window.innerWidth, window.innerHeight ); // Set view size to window size
document.body.appendChild( renderer.domElement ); // Connect renderer to index.html

scene.background = new THREE.Color(0xdddddd); // Set background color for the scene
```

## Light
We need to add lighting to see any object that will be added later. 
To do this, we can add either ambient or directional light or both if needed:
```
// Light
const AmbLight = new THREE.AmbientLight(0xffffff,0.5); // attributes: color, intensity
scene.add(AmbLight);

// White directional light
const dLight = new THREE.DirectionalLight( 0xffffff, 3 ); // attributes: color, intensity
dLight.position.set(5,5,4);
scene.add( dLight );
```

Then, we can also add a directional light helper to help us see the light casting range or area:
```
// Directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper( dLight, 1, 0xfcc203 ); // attributes: light, size, color
scene.add( directionalLightHelper );
```

## Helpers
When developing the scene, it's easier if we use the helpers to measure the position of objects, plane, light, shadow, and the camera:
```
// Axes helper
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(5);
scene.add(gridHelper);

// Directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper( dLight, 1, 0xfcc203 ); // attributes: light, size, color
scene.add( directionalLightHelper );

// Shadow helper
const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera); 
scene.add(dLightShadowHelper);

// Camera helper
const camHelper = new THREE.CameraHelper( camera );
scene.add( camHelper );
```