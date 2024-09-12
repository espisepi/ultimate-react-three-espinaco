import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';


export default function Horse({ url='models/Horse.glb', speed = 1, ...props }) {

    /* --------- Load horse ----------- */
    const { nodes, materials, animations } = useGLTF(url);

    /* --------- Material horse ---------- */
    const [tRoad, tLut] = useLoader(THREE.TextureLoader, [ 'img/road.jpg', 'img/lut.png'])
    const { gl, scene } = useThree();
    const canvas = gl.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const resolution = useMemo(()=>(new THREE.Vector2(width, height)),[width, height]) ;

    const uniforms = Object.assign({}, THREE.UniformsLib.lights, {
        iResolution: { value: resolution },
        iChannel0: { value: scene.background },
        iChannel1: { value: tRoad },
        iLookup: { value: tLut },
        opacity: { value: 1 },
        diffuse: {  value: new THREE.Color(0xffffff) },
		iGlobalTime: {  value: 0 },
    });

    // nodes.mesh_0.material.onBeforeCompile = function (shader) {
    //     shader.fragmentShader = ShaderHorse.fragmentShader;
    //     Object.assign(shader.uniforms, uniforms);
    //     shader.vertexShader = 'varying vec2 vUv;\n' + shader.vertexShader;
    //     shader.vertexShader = 'uniform vec2 iResolution;\n' + shader.vertexShader;
    //     shader.vertexShader = shader.vertexShader.replace(
    //       '#include <begin_vertex>',
    //       [ 
    //         '#include <begin_vertex>',
    //         'vec4 newPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    //         'vec2 screenPos = newPosition.xy / newPosition.w;',
    //         'vUv = screenPos;',
    //         'vUv.x *= iResolution.x / iResolution.y;'
    //       ].join('\n')
    //       );
    // }


    /* --------- Animations horse --------- */
    const [ mixer ] = useState(() => new THREE.AnimationMixer());
    const group = useRef();
    useEffect(()=> void mixer.clipAction(animations[0], group.current).play(),[]);
    useFrame((state, delta) => {
        mixer.update(delta * speed);
    });

    return (
        <group ref={group} scale={[1,1,1]} position={[0,0,0]} {...props} >
            <primitive object={nodes.mesh_0} />
        </group>
    );
}