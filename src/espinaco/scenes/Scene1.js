
import React, { useCallback } from 'react';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei';

import { BoxVideo, BoxShader } from '../prefabs/BoxCustom';
import VideoPoints from '../prefabs/VideoPoints';
import { Suspense } from 'react';

import GodCameraControls from '../controls/GodCameraControls';
import { MusicVisualCubeReact } from '../prefabs/musicVisualCube/MusicVisualCube';
import { SubtitleMesh } from '../prefabs/subtitleMesh/SubtitleMesh';

// Nipple ==================
import ReactNipple from 'react-nipple';
// optional: include the stylesheet somewhere in your app
import 'react-nipple/lib/styles.css';


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
        <SubtitleMesh />
        </>
    )
}

export function NippleJoystick() {


    const handleJoystick = (evt, data)=>{
        const angle = data?.direction?.angle || "undefined"; // angle = "down" || "left" || "right" || "up"
        // console.log( angle)
        if(angle === "up") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'w'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'w'}));
        }
        if(angle === "down") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 's'}));
        }
        if(angle === "left") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'a'}));
        }
        if(angle === "right") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'd'}));
        }
        else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'd'}));
        }
    };
    console.log("oye")

    return (
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { bottom: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed #ff00ff',
                        width: 150,
                        height: 150,
                        position: "absolute",
                        bottom: "50px",
                        left: '50vw'
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onStart={(evt, data) => handleJoystick(evt, data)}
                    onEnd={(evt, data) => handleJoystick(evt, data)}
                    onMove={(evt, data) => handleJoystick(evt, data)}
                    onDir={(evt, data) => handleJoystick(evt, data)}
                    onPlain={(evt, data) => handleJoystick(evt, data)}
                    onShown={(evt, data) => handleJoystick(evt, data)}
                    onHidden={(evt, data) => handleJoystick(evt, data)}
                    onPressure={(evt, data) => handleJoystick(evt, data)}
                />
    )
}

export default function Scene1Canvas({ style }) {
    return (
        <>
        <Canvas style={{...style, backgroundColor:'black'}} >
            <Suspense fallback={<Box material-color='red' material-wireframe='true'/>}>
                <Scene1/>
            </Suspense>

            <GodCameraControls /> 
        </Canvas>
        <div id="ui-controls-godCamera">
            {/* Aqui se ponen botones visuales para manejar la camara para todos los lados -> Asociar cada boton visual a un boton de teclado cuando se pulse */}
            <NippleJoystick />
        </div>
        </>
    )
}