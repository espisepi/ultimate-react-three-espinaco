import { useEffect, useState } from 'react';


export default function useVideo(videoId='video', interval=100) {
    // Hacer un setInterval que finaliza hasta que encuentra el video
    const [video, setVideo] = useState();
    useEffect(()=>{
        const id_interval = setInterval(()=>{
            const videoEl = document.getElementById(videoId);
            if(videoEl && videoEl.videoWidth !== 0 && videoEl.videoHeight !== 0 ){
                setVideo((v)=> (videoEl));
                clearInterval(id_interval);
            }
        },interval);
    },[videoId]);
    return video;
}