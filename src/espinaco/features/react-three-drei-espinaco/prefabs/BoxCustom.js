import React, { useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Box } from '@react-three/drei';

import img1 from "./shaders/img/img1.jpg";
import img2 from "./shaders/img/img2.jpg";
import img3 from "./shaders/img/disp3.jpg";

import useAnalyser from "../../../hooks/analyser/useAnalyser";
import useVideo from "../hooks/useVideo";

import './shaders/audioVisualizer/AudioVisualizerShader1'; // <audioVisualizerShader1 />




export function BoxAudioVisualizerShader1() {

    const analyser = useAnalyser();
    // const video = useVideo();

    const refBox = useRef();

    useFrame(()=>{
        if(analyser && refBox.current.material.uniforms.iChannel0) {
            analyser.update();
            refBox.current.material.uniforms.iChannel0.value.needsUpdate = true;
        }
    })

    return (
        <Box ref={refBox} >
            <audioVisualizerShader1 attach='material' uniforms-iChannel0-value={ analyser ? analyser.getDataTexture() : undefined} />
        </Box>
    )
}






export function BoxVideo({ id='video' }) {

    const video = useMemo(()=>(document.getElementById( id )),[id]);

    const analyser = useAnalyser(id);
    useFrame(()=>{
        if(analyser){
            // analyser.update();
            // console.log(analyser.getUpdateLowerMax());
        }
    })

    // console.log('holi');

    const textureVideo = useMemo(()=>(new THREE.VideoTexture( video ) ),[video]);

    return (
        <Box material-map={textureVideo} scale={[2,2,2]}/>
    )
}

// poner shadertoy
export function BoxShader({}) {
    const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
        img1,
        img2,
        img3
      ]);
    const [hovered, setHover] = useState(false);

    const analyser = useAnalyser('video', 2048);
    const refMesh = useRef();
    useFrame( () => {
        if ( analyser && refMesh.current ) {
            refMesh.current.material.uniforms.dispFactor.value = analyser.getUpdateLowerMax();
        }
    })

    return (
        <mesh
            ref={refMesh}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <planeBufferGeometry attach="geometry" args={[5, 5]} />
            {/* <meshBasicMaterial map={dispTexture} /> */}
            <fade
                attach="material"
                side={THREE.DoubleSide}
                texture={texture1}
                texture2={texture2}
                disp={dispTexture}
                dispFactor={0.5}
            />
      </mesh>
    )
}

