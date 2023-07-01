import { Suspense } from "react";
import { Track } from "./Track";
import { Zoom } from "./Zoom";
import { PointLightAnalyser } from "./PointLightAnalyser";

export function SceneDemoAudioAnalyserSuspense() {
    return (
        <Suspense fallback={null}>
            <SceneDemoAudioAnalyser />
        </Suspense>
    )
}

export function SceneDemoAudioAnalyser() {
    return (
        <Suspense fallback={null}>
            <Track position-z={-0.25} url="video" />
            <Track position-z={0} url="video" />
            <Track position-z={0.25} url="video" />
            <PointLightAnalyser url="video" />
            <PointLightAnalyser url="video" position={[50,50,0]}/>
            {/* <Zoom url="video" /> */}
        </Suspense>
    )
}