import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

import SceneManager from './espinaco/scenes/manager/SceneManager';

import { NippleJoystick } from './espinaco/controls/NippleJoystick';

import { FullScreen, useFullScreenHandle } from "react-full-screen";



const BASE_URL_HEROKU_VIDEO_YT_DL = 'https://video-dl-esp.herokuapp.com/video/video?url=';
const BASE_URL_LOCAL_VIDEO_YT_DL = 'http://localhost:4000/video/video?url=';

const dataMusic = [
  {
    name:'Tove Lo - Habits (Stay High)',
    link:'videos/stayHigh.mp4',
  },
  {
    name:'HOKE - MOONDIAL',
    link:'videos/HOKE-MOONDIAL.mp4',
  }, {
    name:'youtube',
    link: BASE_URL_HEROKU_VIDEO_YT_DL + 'https://www.youtube.com/watch?v=ZelTFpXStE8',
    // link:'http://localhost:4000/video/video?url=https://www.youtube.com/watch?v=0wa1HzC7OY8'  // For Testing in local
  }
]

function App() {

  const [clicked, setClicked] = useState(false);

  const [ showVideo, setShowVideo ] = useState(true);
  const handleShowVideo = useCallback(()=>{
    setShowVideo((v)=>(!showVideo));
  },[showVideo])

  const [ link, setLink ] = useState( dataMusic[1].link );

  const handleInputText = useCallback((event)=>{
    const youtubeUrl = event.target.value;
    setLink((v) => BASE_URL_HEROKU_VIDEO_YT_DL + youtubeUrl);
  },[])

  const handleFullScreen = useFullScreenHandle();
  const toggleFullScreen = useCallback(()=>{
    if(handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  },[handleFullScreen]);


  if(clicked) {
    return (
      <>
      <FullScreen handle={handleFullScreen}>
      
        <SceneManager />

        <video id="video" style={{ display: showVideo ? 'block' : 'none', width: '25vw', height: '25vh', zIndex: 100, position: 'absolute'  }}
        src={link} controls={true} autoPlay={true} crossOrigin="anonymous"></video>

        <div id="ui-controls-godCamera" style={{ display: showVideo ? 'block' : 'none' }}>
            {/* Aqui se ponen botones visuales para manejar la camara para todos los lados -> Asociar cada boton visual a un boton de teclado cuando se pulse */}
            <NippleJoystick />
        </div>

        <input type="text" placeholder='Insert url from youtube like https://www.youtube.com/watch?v=ZelTFpXStE8' onChange={handleInputText} style={{ display: showVideo ? 'block' : 'none', border:'none', borderRadius: '4px', width:'50vw', height:'30px', position: 'absolute', top: '20px', left:'40%' }} />

        <button onClick={toggleFullScreen} style={{ display: showVideo ? 'block' : 'none', width:'50px', height:'50px', borderRadius:'25px', position:'absolute', bottom:'10px', right: '100px', backgroundColor: '#ff00ff', opacity: 0.5 }}> </button>

        <button onClick={handleShowVideo} style={{ width:'50px', height:'50px', borderRadius:'25px', position:'absolute', bottom:'10px', right: '10px', backgroundColor:'white', opacity: showVideo ? 1 : 0.3 }}></button>

      
      </FullScreen>
      </>
    );
  }

  return (
        <div style={{display: 'flex', alignItems: 'center', width: '100%', height: '100vh', color: 'black'}}
             onClick={ () => setClicked(true) } >
          <h1>Click to Start</h1>
        </div>
  );
}

export default App;
