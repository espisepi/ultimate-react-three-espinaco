


import { suspend } from "suspend-react"
import { createAudio, createAudioFromVideoId, mapRangeValue } from "./createAudio"
import { useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import { useRef } from "react"

export function PointLightAnalyser({ url, ...props }) {
    // This will *not* re-create a new audio source, suspense is always cached,
    // so this will just access (or create and then cache) the source according to the url
    const { data } = suspend(() => createAudioFromVideoId(url), [url])
    // return useFrame((state) => {
    //   // Set the cameras field of view according to the frequency average
    //   state.camera.fov = 25 - data.avg / 15
    //   state.camera.updateProjectionMatrix()
    // })
    const pointLightRef = useRef();
    useFrame(()=>{
        if(pointLightRef.current){
            // console.log(data.avg)
            const newData = mapRangeValue(data.avg,90,140,0,1);
            // console.log(newData);
            pointLightRef.current.intensity = newData;
        }
    })
    return (
        <>
        <pointLight ref={pointLightRef} color='red' {...props} />
        </>
    );
}