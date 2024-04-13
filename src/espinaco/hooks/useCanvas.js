import { useEffect, useState } from 'react';


export default function useCanvas( interval=100 ) {
    // Hacer un setInterval que finaliza hasta que encuentra el canvas
    const [canvas, setCanvas] = useState();
    useEffect(()=>{
        const id_interval = setInterval(()=>{
            const [canvasEl] = document.getElementsByTagName("canvas");
            if(canvasEl){
                setCanvas((v)=> (canvasEl));
                clearInterval(id_interval);
            }
        },interval);
    },[]);
    return canvas;
}