
// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture#examples

import { useEffect, useRef, useState } from "react";
import { EspinacoWebRTC } from "./EspinacoWebRTC";
import Scene1Canvas from "../espinaco/scenes/Scene1";

export default function EspinacoWebRTCComponent() {

    const videoElemRef = useRef();
    const startElemRef = useRef();
    const stopElemRef = useRef();
    const logElemRef = useRef();

    const [espinacoWebRTC, setEspinacoWebRTC] = useState();

    useEffect(()=>{
        const videoElem = videoElemRef.current;
        const startElem = startElemRef.current;
        const stopElem = stopElemRef.current;
        const logElem = logElemRef.current;

        if(videoElem != null && startElem != null && stopElem != null && logElem != null) {
            const espinacoWebRTC = new EspinacoWebRTC(videoElem,startElem,stopElem,logElem);
            setEspinacoWebRTC(v=>espinacoWebRTC);
        }

    },[videoElemRef, startElemRef, stopElemRef, logElemRef]);

    console.log(espinacoWebRTC);

    return (
        <div id="espinaco-web-rtc-component">
            <div id="webrtc-capture-screen">
                <p>
                This example shows you the contents of the selected part of your display.
                Click the Start Capture button to begin.
                </p>

                <p>
                    <button ref={startElemRef} id="start">Start Capture</button>
                    &nbsp;
                    <button ref={stopElemRef} id="stop">
                        Stop Capture
                    </button>
                </p>

                <video ref={videoElemRef} id="video" controls={true} autoPlay={true} crossOrigin="anonymous"></video>
                <br />

                <strong>Log:</strong>
                <br />
                <pre ref={logElemRef} id="log"></pre>
            </div>
            { espinacoWebRTC && (
                <div id="espinaco-canvas-scene">
                    <Scene1Canvas style={{position: 'relative', top: '0', width: '100%', height: '100vh'}} />
                </div>
            )}
            
        </div>
    );
}

