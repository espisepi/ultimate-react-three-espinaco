import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

import SceneManager from './espinaco/scenes/manager/SceneManager';

const dataMusic = [
  {
    name:'Tove Lo - Habits (Stay High)',
    link:'videos/stayHigh.mp4',
  },
  {
    name:'HOKE - MOONDIAL',
    link:'videos/HOKE-MOONDIAL.mp4',
  }
]

function App() {

  const [clicked, setClicked] = useState(false);

  const [ showVideo, setShowVideo ] = useState(true);
  const handleShowVideo = useCallback(()=>{
    setShowVideo((v)=>(!showVideo));
  },[showVideo])

  const [ link, setLink ] = useState( dataMusic[1].link );



  if(clicked) {
    return (
      <>
      <SceneManager />
      <video id="video" style={{ display: showVideo ? 'block' : 'none', width: '25vw', height: '25vh', zIndex: 100, position: 'absolute'  }}
       src={link} controls={true} autoPlay={true} crossOrigin="anonymous"></video>
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
