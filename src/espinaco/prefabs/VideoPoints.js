

import { useState, useEffect } from "react";
import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber";

import useAnalyser from "../hooks/analyser/useAnalyser";

import VideoPointShader from "./shaders/VideoPointShader";




export default function VideoPoints({ id_video = 'video' }) {
        
    const { scene } = useThree();

    // Hacer un setInterval que finaliza hasta que encuentra el video y cuando lo encuentra se ejecuta el useEffect siguiente (crear useState para el video)
    const [video, setVideo] = useState();
    useEffect(()=>{
        const id_interval = setInterval(()=>{
            const videoEl = document.getElementById(id_video);
            if(videoEl && videoEl.videoWidth !== 0 && videoEl.videoHeight !== 0 ){
                setVideo((v)=> (videoEl));
                clearInterval(id_interval);
            }
        },100);
    },[id_video]);

    // Crear particles con el video
    const [points, setPoints] = useState();
    useEffect(()=>{

        if(video) {

            // Define Geometry
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const uvs = [];
    
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
    
            for (let y = 0, height = videoHeight; y < height; y += 1) {
                for (let x = 0, width = videoWidth; x < width; x += 1) {
                    const vertex = new THREE.Vector3(
                        x - videoWidth / 2,
                        -y + videoHeight / 2,
                        0
                    );
                    positions.push( vertex.x, vertex.y, vertex.z );
                    uvs.push( x / videoWidth, y / videoHeight );
                }
            }
            console.log('video height: ' + videoHeight);
            console.log('video width: ' + videoWidth);
    
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
            
            // Define Material
            const material = new VideoPointShader();
            material.uniforms.iChannel0.value = new THREE.VideoTexture(video);

            // Define Points
            const particles = new THREE.Points(geometry, material);
            particles.rotation.x += Math.PI;
            // Temporal
            particles.position.z += -200.0;
            particles.scale.set(0.5,0.5,0.5);
        
            scene.add(particles);
            setPoints((v)=>(particles));
    
            return () => {
                scene.remove(particles);
                setPoints((v)=>(null));
            }

        }

    },[video]);

    const analyser = useAnalyser('video');
    useFrame(()=>{
        if ( analyser && points ) {
           points.material.uniforms.bass.value = analyser.getUpdateLowerMax();
        }
    })

    return (
        null
        // Lo mas logico es hacerlo en un useEffect para controlar cuando se renderiza por parámetro
        // <points>
        //     <bufferGeometry attach="geometry">
        //     <bufferAttribute
        //         attachObject={['attributes', 'position']}
        //         array={new THREE.Float32BufferAttribute( positions, 3 )}
        //         // count={positions.length / 3}
        //         // itemSize={3}
        //     />
        //     </bufferGeometry>
        // </points>
    )
}