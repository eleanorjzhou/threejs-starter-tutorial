# Getting Started with Three.js

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
2. install `three.js` and the build tool Vite: `npm install --save three` and `npm install --save dev vite`
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


