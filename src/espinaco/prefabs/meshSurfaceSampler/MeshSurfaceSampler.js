import { useEffect } from "react";
import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber";
import { MeshSurfaceSampler as MeshSurfaceSamplerTHREE } from 'three/addons/math/MeshSurfaceSampler.js';
import { useGLTF } from "@react-three/drei";

// https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/

// scene.userData.updateFunctions = []  -> Array que guarda una lista de funciones para ejecutar cada frame (es decir en useFrame)

export function MeshSurfaceSampler() {
    const { scene } = useThree();
    const meshModel = useGLTF("models/LeePerrySmith.glb");
    // console.log(meshModel)
    useEffect(()=>{
        // Le añadimos a la scene un nuevo atributo que es un array de funciones para realizar en el useFrame()
        scene.userData.updateFunctions = scene.userData.updateFunctions || [];

        // const removeMesh = createCubeWithSpheres(scene);
        // const removeMesh = createThorusWithPoints(scene);
        const removeMesh = createModelWithPoints(scene, meshModel.scene.children[0]);
        // const removeMesh = createModelWithPathLines(scene, meshModel.scene.children[0]);
        return () => removeMesh();

    }, []);
    let updateFunctions;
    useFrame(()=>{
        updateFunctions = scene.userData?.updateFunctions;
        if(updateFunctions && updateFunctions.length != 0) {
            for(let i = 0; i < updateFunctions.length; i++) {
                updateFunctions[i]();
            }
        }
    });
    return null;
}

// Añadimos a la variable scene.userData.updateFunctions una funcion para updatear cada frame
function createModelWithPathLines(scene, meshModel) {
    if(!meshModel?.material) return;
    meshModel.material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xff0000,
        transparent: true,
        opacity: 0.05
    });
    scene.add(meshModel);
    const sampler = new MeshSurfaceSamplerTHREE(meshModel).build();
    // =====================
    /* Used to store each particle coordinates & color */
    const vertices = [];
    const colors = [];
    /* The geometry of the points */
    const sparklesGeometry = new THREE.BufferGeometry();
    /* The material of the points */
    const sparklesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaTest: 0.2,
    // map: new THREE.TextureLoader().load("path/to/texture.png"),
    vertexColors: true // Let Three.js knows that each point has a different color
    });
    /* Create a Points object */
    const points = new THREE.Points(sparklesGeometry, sparklesMaterial);
    /* Add the points into the scene */
    scene.add(points);
    // Sample a point on each frame
    /* Define the colors we want */
    const palette = [new THREE.Color("#FAAD80"), new THREE.Color("#FF6767"), new THREE.Color("#FF3D68"), new THREE.Color("#A73489")];
    /* Vector to sample a random point ==================================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const tempPosition = new THREE.Vector3();
    class Path {
        constructor () {
            /* The array with all the vertices of the line */
            this.vertices = [];
            /* The geometry of the line */
            this.geometry = new THREE.BufferGeometry();
            /* The material of the line */
            this.material = new THREE.LineBasicMaterial({color: 0x14b1ff});
            /* The Line object combining the geometry & the material */
            this.line = new THREE.Line(this.geometry, this.material);
            /* Sample the first point of the line */
            sampler.sample(tempPosition);
            /* Store the sampled point so we can use it to calculate the distance */
            this.previousPoint = tempPosition.clone();

            scene.add(this.line);
        }
        update () {
            /* Variable used to exit the while loop when we find a point */
            let pointFound = false;
            /* Loop while we haven't found a point */
            const MAX_DISTANCE_BETWEEN_POINTS = 1;
            while (!pointFound) {
              /* Sample a random point */
              sampler.sample(tempPosition);
              /* If the new point is less 30 units from the previous point */
              if (tempPosition.distanceTo(this.previousPoint) < MAX_DISTANCE_BETWEEN_POINTS) {
                /* Add the new point in the vertices array */
                this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
                /* Store the new point vector */
                this.previousPoint = tempPosition.clone();
                /* Exit the loop */
                pointFound = true;
              }
            }
            /* Update the geometry */
            this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
          }
    }
    const path = new Path();
    // Le añadimos a la scene una nueva funcion que se ejecutara en el useFrame
    const MAX_NUMBER_POINTS = 30000;
    scene.userData.updateFunctions.push(()=>{
        if (path.vertices.length < MAX_NUMBER_POINTS) {
            path.update();
        }
    });
    return () => {
        scene.remove(meshModel);
        scene.remove(points);
    }
}


// Añadimos a la variable scene.userData.updateFunctions una funcion para updatear cada frame
function createModelWithPoints(scene, meshModel) {
    if(!meshModel?.material) return;
    meshModel.material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xff0000,
        transparent: true,
        opacity: 0.05
    });
    scene.add(meshModel);
    const sampler = new MeshSurfaceSamplerTHREE(meshModel).build();
    // =====================
    /* Used to store each particle coordinates & color */
    const vertices = [];
    const colors = [];
    /* The geometry of the points */
    const sparklesGeometry = new THREE.BufferGeometry();
    /* The material of the points */
    const sparklesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaTest: 0.2,
    // map: new THREE.TextureLoader().load("path/to/texture.png"),
    vertexColors: true // Let Three.js knows that each point has a different color
    });
    /* Create a Points object */
    const points = new THREE.Points(sparklesGeometry, sparklesMaterial);
    /* Add the points into the scene */
    scene.add(points);
    // Sample a point on each frame
    /* Define the colors we want */
    const palette = [new THREE.Color("#FAAD80"), new THREE.Color("#FF6767"), new THREE.Color("#FF3D68"), new THREE.Color("#A73489")];
    /* Vector to sample a random point */
    const tempPosition = new THREE.Vector3();

    function addPoint() {
        /* Sample a new point */
        sampler.sample(tempPosition);
        /* Push the point coordinates */
        vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
        /* Update the position attribute with the new coordinates */
        sparklesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3)  );
        
        /* Get a random color from the palette */
        const color = palette[Math.floor(Math.random() * palette.length)];
        /* Push the picked color */
        colors.push(color.r, color.g, color.b);
        /* Update the color attribute with the new colors */
        sparklesGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    }
    // Le añadimos a la scene una nueva funcion que se ejecutara en el useFrame
    const MAX_NUMBER_POINTS = 30000;
    scene.userData.updateFunctions.push(()=>{
        if (vertices.length < MAX_NUMBER_POINTS) {
            addPoint();
        }
    });
    return () => {
        scene.remove(meshModel);
        scene.remove(points);
    }
}

function createThorusWithPoints(scene) {
    const cube = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    );
    const sampler = new MeshSurfaceSamplerTHREE(cube).build();
    // ===================
    /* Sample the coordinates */
    const vertices = [];
    const tempPosition = new THREE.Vector3();
    const numberPoints = 50000;
    for (let i = 0; i < numberPoints; i ++) {
    sampler.sample(tempPosition);
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
    }

    /* Create a geometry from the coordinates */
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    /* Create a material */
    const pointsMaterial = new THREE.PointsMaterial({
    color: 0xff61d5,
    size: 0.03
    });
    /* Create a Points object */
    const points = new THREE.Points(pointsGeometry, pointsMaterial);

    /* Add the points into the scene */
    scene.add(points);
    return () => {
        scene.remove(points);
    }
}


function createCubeWithSpheres(scene) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    );
    const sampler = new MeshSurfaceSamplerTHREE(cube).build();
    // ===================
    const sphereGeometry = new THREE.SphereGeometry(0.05, 6, 6);
    const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffa0e6
    });
    const spheres = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, 300);
    scene.add(spheres);	
    // ====================
    const tempPosition = new THREE.Vector3();
    const tempObject = new THREE.Object3D();
    for (let i = 0; i < 300; i++) {
        sampler.sample(tempPosition);
        tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
        tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
        tempObject.updateMatrix();
        spheres.setMatrixAt(i, tempObject.matrix);
    }	
    return () => {
        scene.remove(spheres);
    }
}