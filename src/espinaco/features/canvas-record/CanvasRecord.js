import React, { useState } from "react";
import useCanvas from "../../hooks/useCanvas";

export default function CanvasRecord() {
    const canvas = useCanvas();
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);

    const startRecording = () => {
        // console.log("Empieza la grabacion! canvas seleccionado: ", canvas);
        // const canvas = canvasRef.current;
        const stream = canvas.captureStream(30); // Captura a 60 FPS

        // Elige el tipo MIME basado en el soporte del navegador
        const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';

        const recorder = new MediaRecorder(stream, { mimeType });
    
        let recordedChunks = [];
        recorder.ondataavailable = event => {
          if (event.data.size > 0) recordedChunks.push(event.data);
        };
    
        recorder.onstop = () => {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm',
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'canvasRecording.webm';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
    
        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
        // Aquí puedes iniciar tu lógica de animación o dibujo en el canvas
    };
    
    const stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
        // Detener aquí tu lógica de animación o dibujo en el canvas
    };
  
    return (
        <>
        <div>
            <button onClick={startRecording} disabled={recording}>Iniciar Grabación</button>
            <button onClick={stopRecording} disabled={!recording}>Detener Grabación</button>
        </div>
        </>
    )
}
