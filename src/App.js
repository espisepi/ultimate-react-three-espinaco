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
  }, {
    name:'Kaydy Cain - Perdedores del Barrio, highkili ay linda,',
    link: BASE_URL_HEROKU_VIDEO_YT_DL + 'https://www.youtube.com/watch?v=ZelTFpXStE8',
  }, {
    name:'sotoasa jugador, trueno, ',
    link: BASE_URL_HEROKU_VIDEO_YT_DL + 'https://www.youtube.com/watch?v=ZelTFpXStE8',
  }, {
    name:'Kaydy Cain - Perdedores del Barrio',
    link: BASE_URL_HEROKU_VIDEO_YT_DL + 'https://www.youtube.com/watch?v=ZelTFpXStE8',
  }
]

function App() {

  const [clicked, setClicked] = useState(false);

  const [ showVideo, setShowVideo ] = useState(true);
  const handleShowVideo = useCallback(()=>{
    setShowVideo((v)=>(!showVideo));
  },[showVideo])

  const [ link, setLink ] = useState( dataMusic[0].link );

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

  const handleAutoRotate = useCallback(()=>{
    if(window.orbitControls) {
      window.orbitControls.autoRotate = !window.orbitControls.autoRotate;
    }
  }, []);

  // TODO: UI Para mostrar todas las canciones y poder cambiar de cancion en la lista de reproduccion que he hecho (la variable dataMusic)


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

        <button onClick={handleAutoRotate} style={{ display: showVideo ? 'block' : 'none', width:'50px', height:'50px', borderRadius:'25px', position:'absolute', bottom:'10px', right: '200px', backgroundColor: '#ffff00', opacity: 0.5 }}> </button>

        <button onClick={toggleFullScreen} style={{ display: showVideo ? 'block' : 'none', width:'50px', height:'50px', borderRadius:'25px', position:'absolute', bottom:'10px', right: '100px', backgroundColor: '#ff00ff', opacity: 0.5 }}> </button>

        <button onClick={handleShowVideo} style={{ width:'50px', height:'50px', borderRadius:'25px', position:'absolute', bottom:'10px', right: '10px', backgroundColor:'white', opacity: showVideo ? 1 : 0.3 }}></button>

      
      </FullScreen>
      </>
    );
  }

  return (
        <div style={{display: 'flex', alignItems: 'center', width: '100%', height: '100vh', color: 'black', backgroundColor: '#500050'}}
             onClick={ () => setClicked(true) } >
          <h1>Click to Start</h1>
        </div>
  );
}

export default App;
