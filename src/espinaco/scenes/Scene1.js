
import React from 'react';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei';

import { BoxVideo, BoxShader } from '../prefabs/BoxCustom';
import VideoPoints from '../prefabs/VideoPoints';
import { Suspense } from 'react';

import GodCameraControls from '../controls/GodCameraControls';


export function Scene1() {
    return (
        <>
        <ambientLight />
        {/* <Box /> */}
        {/* <BoxVideo /> */}
        {/* <BoxShader /> */}
        <VideoPoints />
        </>
    )
}

export default function Scene1Canvas({ style }) {
    return (
        <Canvas style={{...style, backgroundColor:'black'}} >
            <Suspense fallback={<Box material-color='red' material-wireframe='true'/>}>
                <Scene1/>
            </Suspense>

            <GodCameraControls /> 
        </Canvas>
    )
}