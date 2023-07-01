import { useGLTF } from "@react-three/drei";
import useAnalyser from "../hooks/analyser/useAnalyser";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointLightMusicClass } from "./classes/PointLightMusicClass";




export function SkullMusic() {
    console.log("skull music!");

    const model = useGLTF("models/skull.glb");

    const analyser = useAnalyser('video');
    const { scene } = useThree();
    const [pointsLights,setPointsLights] = useState([]);
    useEffect(()=>{
        if(analyser && model && scene) {
            const pointLightMusic = new PointLightMusicClass(analyser);
            console.log(pointLightMusic)
            scene.add(pointLightMusic);
            pointsLights.push(pointLightMusic);
        }
    },[analyser,model,scene]);
    useFrame(()=>{
        if(analyser && pointsLights.length !== 0) {
            for(let i = 0; i < pointsLights.length; i++) {
                pointsLights[i].update();
            }
            analyser.update();
        }
    })

    return (
        <group>
            <primitive object={model.scene} />;
        </group>
    )
}