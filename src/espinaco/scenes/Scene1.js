
import React, { useCallback } from 'react';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Stars } from '@react-three/drei';

import { BoxVideo, BoxShader } from '../prefabs/BoxCustom';
import VideoPoints from '../prefabs/VideoPoints';
import { Suspense } from 'react';

import GodCameraControls from '../controls/GodCameraControls';
import { MusicVisualCubeReact } from '../prefabs/musicVisualCube/MusicVisualCube';
import { SubtitleMesh } from '../prefabs/subtitleMesh/SubtitleMesh';

import { MeshSurfaceSampler } from '../prefabs/meshSurfaceSampler/MeshSurfaceSampler';

import { MemoryCardGame } from '../games/memoryCardGame/MemoryCardGame';



// Coger efectos de codrops
// Mezclar esos dos efectos para soto asa videoclip
// https://tympanus.net/Tutorials/text-trail-effect/
// https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/
// https://tympanus.net/Tutorials/SurfaceSampling/index3.html
// Para efectos de letras: https://tympanus.net/Development/3DTypeEffects/03_flowers.html


export function Scene1() {
    return (
        <>
        <ambientLight />
        {/* <Box /> */}
        {/* <BoxVideo /> */}
        {/* <BoxShader /> */}
        <VideoPoints />
        {/* <MusicVisualCubeReact /> */}
        {/* <SubtitleMesh /> */}
        {/* <MeshSurfaceSampler /> */}
        <Stars radius={1000}  count={9999} depth={400} factor={30} fade/* saturation={1} */ /* speed={1} */ />
        </>
    )
}



export default function Scene1Canvas({ style }) {
    return (
        <>
        <Canvas style={{...style, backgroundColor:'black'}} camera={{position:[0,0,400], far: 99999 }}>
            <Suspense fallback={<Box material-color='red' material-wireframe='true'/>}>
                <Scene1/>
            </Suspense>

            {/* <Suspense fallback={<Box material-color='green' material-wireframe='true'/>}>
                <MemoryCardGame />
            </Suspense> */}


            <GodCameraControls /> 
        </Canvas>
        </>
    )
}