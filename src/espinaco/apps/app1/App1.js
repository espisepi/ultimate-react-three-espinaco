import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  Points,
  Vector3,
  Spherical,
  Color,
  AdditiveBlending,
  ShaderMaterial,
} from "three";


import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Scene1Canvas from "../../scenes/scene1/Scene1";
import Scene2Canvas from "../../scenes/scene2/Scene2";
import VideoPlayer from "../../features/videoplayer/components/VideoPlayer";
import { NippleJoystick } from "../../controls/nipplejoystick/NippleJoystick";
import { useThree } from "@react-three/fiber";
import useVideo from "../../hooks/useVideo";
import SceneManager from "../../scenes/manager/SceneManager";
import CanvasRecord from "../../features/canvas-record/CanvasRecord";

import { useVideoPlayerStore } from "../../features/videoplayer/hook/useVideoPlayerStore";
import CanvasDefault from "../../components/canvas/CanvasDefault";
import CanvasXR from "../../components/canvas/CanvasXR";

import useAppManagerStore from "../manager/store/AppManagerStore";
import useSceneManagerStore from "../../scenes/manager/store/SceneManagerStore";
import ControlsManager from "../../controls/manager/ControlsManager";
import useControlsManagerStore from "../../controls/manager/store/ControlsManagerStore";
import ControlsManagerXR from "../../controls/manager/ControlsManagerXR";
import useControlsManagerXRStore from "../../controls/manager/store/ControlsManagerXRStore";
import ButtonChangeControls from "../../controls/manager/components/buttons/ButtonChangeControls";
import ButtonChangeXRMode from "../manager/components/buttons/ButtonChangeXRMode";
import ButtonChangeResolutionVideo from "../../features/videoplayer/components/buttons/ButtonChangeResolutionVideo";
import ButtonChangeScene from "../../scenes/manager/components/buttons/ButtonChangeScene";


const BASE_URL_HEROKU_VIDEO_YT_DL =
  "https://video-dl-esp.herokuapp.com/video/video?url=";
const BASE_URL_LOCAL_VIDEO_YT_DL = "http://localhost:4000/video/video?url=";
const BASE_URL_RENDERER_YT_DL =
  "https://video-dl.onrender.com/video/video?url=";

// let window_url_youtube = window.urlYoutube || "";
// window.urlYoutube = window_url_youtube;

// let window_show_video = window.showVideo || true;
// window.showVideo = window_show_video;

// const window_urlYoutube = 'videos/mcpi.mp4';
// const window_urlYoutube = window.urlYoutube || BASE_URL_HEROKU_VIDEO_YT_DL + "https://www.youtube.com/watch?v=MaaEVFNDQLo";
const window_showVideo = window.showVideo || false;
// const INIT_STATE = { window_urlYoutube, window_showVideo };

// (COMENTARIO ANTIGUO DE CUANDO REALIZABA LA BUILD A MANO Y LA INCLUIA EN WORDPRESS COPIANDO Y PEGANDO LA CARPETA BUILD POR FTP, AHORA LO HACEMOS CON MICROFRONTEND DESPLEGADO EN UNA URL JEJE) TODO ACORDARSE!!!: CADA VEZ QUE SE HACE BUILD HAY QUE CAMBIAR LOS NOMBRES DE LOS FICHEROS JS Y CSS GENERADOS EN LA PAGINA DE WORDPRESS.

// Errores a mejorar
// Cuando se pone en horizontal aparece margen blanco en los laterales
// añadir logo de cargando video mientras carga el video OK
// que se pueda pasar por url el video de youtube a mostrar

/**
 * 
 * FUFU - SLOU
Feid, Young Miko - Classy 101 (Official Video)
MIDAS ALONSO FT J.ROLDAN - A-6 (VIDEOCLIP OFICIAL) PROD.BY DELSON ARAVENA
D.NADIE - LOS OJOS COMO LUNAS (Visualizer)
SOSAD.97 | SOUKIN - PRESCRITO (prod. Fulston)
MOLINA - CODO CON CODO
Soto Asa - Gibraltar (Videoclip)
2. Soto Asa - La Primera (ft. Mala Rodríguez)
Saiko - Supernova (Official Video)
Saiko, Feid, Quevedo, Mora - Polaris Remix (Video Oficial)
https://www.youtube.com/watch?v=fLzU21ltH4U
https://www.youtube.com/watch?v=4DFxeyPiRkM
 * 
 */

// TODO: Añadir analiticas para ver cuantas personas se meten dentro de la web, desde que lugares y si es smartphone u ordenador
// TODO: Añadir en la pantalla de introduccion mis redes sociales (sepinaco)

// TODO HECHO: Moverse con joystick y el target del orbitcontrols en la camara del player para que simule el movimiento de la cabeza

// TODO: Poder visualizar un streaming con videoPoints : WEBRTC, grabar pantalla js
// TODO: Subir video desde el movil/pc y reproducirlo

// TODO: Sketchbook con codigo ts dentro de este proyecto react

// TODO: Poner licencia de que se puede utilizar libremente el codigo pero sin fines de lucro.

const DEFAULT_VIDEOPOINTS_POINTSSIZE = 1.5; //Mirar este valor en VideoPointsShader.js -> pointSize: { type: "f", value: 1.5 },
const DEFAULT_VIDEOPOINTS_AMPLITUDEDISTANCE = 1.0;
const DEFAULT_STARS_POINTSIZE = 55;
const DEFAULT_VIDEOPOINTS_SCALE = 1;
const DEFAULT_STARS_SCALE = 1;

export default function App1({}) {
  const [clicked, setClicked] = useState(false);
  if (clicked) {
    return <App1Start />;
  }
  return <App1ClickToStart setClicked={setClicked} />;
}

export function App1ClickToStart({ setClicked }) {

  // Mecanismo de contrasenia
  const contrasenia = "3";
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === contrasenia || true) {
      setClicked(true)
    }
  };

  return (
    <div
      className="background-initial"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        color: "white",
        backgroundColor: "#500050",
        backgroundImage: 'url("images/portada.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => setClicked(true)}
    >
      {/* <h1 style={{ cursor: "hover" }}>Click to Start</h1> */}
      <h1 style={{ cursor: "hover" }}>Enter Password</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      {/* <a href="https://sketchbook-sepinaco.onrender.com">
        <h1
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            paddingRight: 50,
            cursor: "hover",
          }}
        >
          Access Grand Theft Espinaco
        </h1>
      </a> */}
    </div>
  );
}

export function App1Start({ url }) {
  const [clicked, setClicked] = useState(false);

  const xrmode = useAppManagerStore( state => state.xrmode );
  const displayVideoplayer = useAppManagerStore( state => state.displayVideoplayer );


  //======================================

  const [showVideo, setShowVideo] = useState(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !showVideo);
  }, [showVideo]);

  //======================================

  const handleFullScreen = useFullScreenHandle();
  const toggleFullScreen = useCallback(() => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  }, [handleFullScreen]);

  //======================================

  const [
    booleanForHandleTargetOrbitControls,
    setBooleanForHandleTargetOrbitControls,
  ] = useState(true);
  const handleTargetOrbitControls = useCallback(() => {
    if ((window.orbitControls, window.camera, window.videoPoints)) {
      setBooleanForHandleTargetOrbitControls(
        !booleanForHandleTargetOrbitControls
      );
      if (booleanForHandleTargetOrbitControls) {
        window.orbitControls.target.copy(
          new Vector3(
            window.camera.position.x,
            window.camera.position.y,
            window.camera.position.z - 0.1
          )
        );
      } else {
        window.orbitControls.target.copy(window.videoPoints.position);
      }
    }
  });

  //======================================

  const handleAutoRotate = useCallback(() => {
    if (window.orbitControls) {
      window.orbitControls.autoRotate = !window.orbitControls.autoRotate;
    }
  }, []);

  //======================================
  // Para poner el valor actual en el input range
  const inputRangeVideoPointsSizeRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsSizeRef.current) {
      inputRangeVideoPointsSizeRef.current.value =
        DEFAULT_VIDEOPOINTS_POINTSSIZE;
    }
  }, [inputRangeVideoPointsSizeRef]);
  // Modificar el inputRange
  const handleVideoPointSize = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.material.uniforms.pointSize.value = value;
    }
  }, []);
  //======================================

  //======================================
  // Para poner el valor actual en el input range
  const inputRangeVideoPointsAmplitudeDistanceRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsAmplitudeDistanceRef.current) {
      inputRangeVideoPointsAmplitudeDistanceRef.current.value =
        DEFAULT_VIDEOPOINTS_AMPLITUDEDISTANCE;
    }
  }, [inputRangeVideoPointsAmplitudeDistanceRef]);
  // Modificar el inputRange
  const handleVideoPointAmplitudeDistance = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.material.uniforms.amplitudeDistance.value = value;
    }
  }, []);
  //======================================

  const inputRangeVideoPointsScaleRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsScaleRef.current) {
      inputRangeVideoPointsScaleRef.current.value = DEFAULT_VIDEOPOINTS_SCALE;
    }
  }, [inputRangeVideoPointsScaleRef]);
  const handleVideoPointScale = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.scale.set(value, value, value);
    }
  }, []);

  //====================================== Video current time
  const video = useVideo();
  const inputRangeVideoCurrentTimeRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoCurrentTimeRef.current) {
      inputRangeVideoCurrentTimeRef.current.value = 0.0;
    }
  }, []);
  const handleVideoCurrentTime = useCallback((value) => {
    // value -> Rango [0,1000]
    const valueNormalized = value / 1000.0 - 0.01; // -0.01 para evitar errores al llegar al valor maximo en la cancion
    if (video?.currentTime) {
      video.currentTime = valueNormalized * video.duration;
    }
  });

  //======================================

  //======================================

  const inputRangeStarsScaleRef = useRef(null);
  useEffect(() => {
    if (inputRangeStarsScaleRef.current) {
      inputRangeStarsScaleRef.current.value = DEFAULT_STARS_SCALE;
    }
  }, [inputRangeStarsScaleRef]);
  const handleStarsScale = useCallback((value) => {
    // TODO: Utilizar la funcion definida en handleStarsPointSize pero con:  const radius = value || 55;
  }, []);
  //======================================

  //======================================

  const handleRotationStars = useCallback(() => {
    if (window.stars) {
      window.stars.isRotating = !window.stars.isRotating;
    }
  }, []);

  //======================================

  const inputRangeStarsPointSizeRef = useRef(null);
  useEffect(() => {
    if (inputRangeStarsPointSizeRef.current) {
      inputRangeStarsPointSizeRef.current.value = DEFAULT_STARS_POINTSIZE;
    }
  }, [inputRangeStarsPointSizeRef]);
  const handleStarsPointSize = useCallback((value) => {
    if (window.stars) {
      //count, depth, factor, radius, saturation
      const count = 1999;
      const saturation = 1.0;
      const radius = 1000;
      const depth = 400;
      const factor = value || 55;
      const genStar = (r) => {
        return new Vector3().setFromSpherical(
          new Spherical(
            r,
            Math.acos(1 - Math.random() * 2),
            Math.random() * 2 * Math.PI
          )
        );
      };

      const [position, color, size] = (() => {
        const positions = [];
        const colors = [];
        const sizes = Array.from(
          { length: count },
          () => (0.5 + 0.5 * Math.random()) * factor
        );
        const color = new Color();
        let r = radius + depth;
        const increment = depth / count;
        for (let i = 0; i < count; i++) {
          r -= increment * Math.random();
          positions.push(...genStar(r).toArray());
          color.setHSL(i / count, saturation, 0.9);
          colors.push(color.r, color.g, color.b);
        }
        return [
          new Float32Array(positions),
          new Float32Array(colors),
          new Float32Array(sizes),
        ];
      })();

      // Sustituir los valores
      window.stars.geometry.attributes.size.array = size;
      window.stars.geometry.attributes.size.needsUpdate = true;
    }
  }, []);

  //================================================

  const [showMenuButton, setShowMenuButton] = useState(true);
  useEffect(() => {
    function manejarTecla(event) {
      if (event.key === "2") {
        setShowMenuButton(true);
        setShowVideo(true);
      }
      if (event.key === "1") {
        setShowMenuButton(false);
        setShowVideo(false);
      }
      if (event.key === "3") {
        window.orbitControls.autoRotate = !window.orbitControls.autoRotate;
      }
    }

    // Agregar un event listener al documento para detectar las teclas
    document.addEventListener("keydown", manejarTecla);
    return () => {
      document.removeEventListener("keydown", manejarTecla);
    };
  }, []);

  const handleShowMenuButton = () => {
    if (showMenuButton) {
      setShowMenuButton(false);
      setShowVideo(false);
    } else {
      setShowMenuButton(true);
      setShowVideo(true);
    }
  };

  const MARGIN_BOTTOM_RANGES = 65;

  //================================================

  const [isGbaVisible, setIsGbaVisible] = useState(true);
  const [isGbaRemoved, setIsGbaRemoved] = useState(false);
  const [isOccludeBlending, setIsOccludeBlending] = useState(false);
  const [isDisplayTextureGbaGame, setIsDisplayTextureGbaGame] = useState(true);
  const handleToggleIsGbaVisible = () => {
    setIsGbaVisible(!isGbaVisible);
  };
  const handleToggleIsGbaRemoved = () => {
    setIsGbaRemoved(!isGbaRemoved);
  };
  const handleToggleIsOccludeBlending = () => {
    setIsOccludeBlending(!isOccludeBlending);
  };
  const handleToggleIsDisplayTextureGbaGame = () => {
    setIsDisplayTextureGbaGame(!isDisplayTextureGbaGame);
  };

  



  // TODO: UI Para mostrar todas las canciones y poder cambiar de cancion en la lista de reproduccion que he hecho (la variable dataMusic)
  // TODO: Reproducir canciones aleatoriamente o en bucle la misma cancion (checkbox para elegir la opcion)
  return (
    <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
      <FullScreen handle={handleFullScreen}>
        {/* <Scene1Canvas
          isGbaRemoved={isGbaRemoved}
          isGbaVisible={isGbaVisible}
          isOccludeBlending={isOccludeBlending}
          isDisplayTextureGbaGame={isDisplayTextureGbaGame}
          style={{
            position: "relative",
            top: "0",
            width: "100%",
            height: "100vh",
          }}
        /> */}
        {/* <Scene2Canvas
          style={{
            position: "relative",
            top: "0",
            width: "100%",
            height: "100vh",
          }}
        /> */}

       

        { xrmode ? (
            <CanvasXR 
              style={{
                position: "relative",
                top: "0",
                width: "100%",
                height: "100vh",
              }}
            >
              <ControlsManagerXR />
              <SceneManager/>
            </CanvasXR >
          ) : (
             <CanvasDefault 
              style={{
                position: "relative",
                top: "0",
                width: "100%",
                height: "100vh",
              }}
            >
              <ControlsManager />
              <SceneManager />
            </CanvasDefault >
        )}

        {/* <CanvasRecord /> */}
        {displayVideoplayer && (  
          <VideoPlayer showUI={showVideo} />
        )}

        <div
          id="div-input-range-video-point-size"
          className="range"
          style={{
            display: showVideo ? "block" : "none",
            position: "absolute",
            left: 30,
            bottom: 190 + MARGIN_BOTTOM_RANGES,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            className="range1"
            type="range"
            ref={inputRangeVideoPointsSizeRef}
            onChange={(e) => handleVideoPointSize(e.target.value)}
            min={0.1}
            max={30.0}
            step={0.1}
            // value={0.0}
          ></input>
        </div>
        <div
          id="div-input-range-video-point-amplitude-distance"
          className="range"
          style={{
            display: showVideo ? "block" : "none",
            position: "absolute",
            left: 30,
            bottom: 220 + MARGIN_BOTTOM_RANGES,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            className="range1"
            type="range"
            ref={inputRangeVideoPointsAmplitudeDistanceRef}
            onChange={(e) => handleVideoPointAmplitudeDistance(e.target.value)}
            min={-9000.0}
            max={9000.0}
            step={1}
            // value={0.0}
          ></input>
        </div>
        <div
          id="div-input-range-video-point-scale"
          className="range"
          style={{
            display: showVideo ? "block" : "none",
            position: "absolute",
            left: 30,
            bottom: 160 + MARGIN_BOTTOM_RANGES,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            className="range1"
            type="range"
            ref={inputRangeVideoPointsScaleRef}
            onChange={(e) => handleVideoPointScale(e.target.value)}
            min={0.1}
            max={30.0}
            step={0.1}
            // value={0.0}
          ></input>
        </div>
        {/* <div
          id="div-input-range-stars-scale"
          style={{
            display: showVideo ? "block" : "none",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            position: "absolute",
            left: 30,
            bottom: 100,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            type="range"
            ref={inputRangeStarsPointSizeRef}
            onChange={(e) => handleStarsScale(e.target.value)}
            min={1.0}
            max={30.0}
            step={1}
            // value={0.0}
          ></input>
        </div> */}
        <div
          id="div-input-range-stars-pointSize"
          className="range"
          style={{
            display: showVideo ? "block" : "none",
            position: "absolute",
            left: 30,
            bottom: 130 + MARGIN_BOTTOM_RANGES,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            className="range1"
            type="range"
            ref={inputRangeStarsPointSizeRef}
            onChange={(e) => handleStarsPointSize(e.target.value)}
            min={0.0}
            max={1000.0}
            step={1}
            // value={0.0}
          ></input>
        </div>

        <div
          id="div-input-video-currentTime"
          className="range"
          style={{
            display: showVideo ? "block" : "none",
            position: "absolute",
            left: 30,
            bottom: 100 + MARGIN_BOTTOM_RANGES,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            className="range1"
            type="range"
            ref={inputRangeVideoCurrentTimeRef}
            onChange={(e) => handleVideoCurrentTime(e.target.value)}
            min={1.0}
            max={1000.0}
            step={1}
            // value={0.0}
          ></input>
        </div>

        {/* <button
          onClick={handleRotationStars}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "150px",
            //   backgroundColor: "#ffff00",
            background: "linear-gradient(90deg, #0cb300 0%, #000000 100%)",
            opacity: 0.5,
          }}
        >
          {" "}
        </button> */}

        <button
          onClick={handleAutoRotate}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "190px",
            //   backgroundColor: "#ffff00",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
            cursor: "pointer"
          }}
        >
          {" "}
        </button>

        <button
          onClick={toggleFullScreen}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "100px",
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
            cursor: "pointer",
          }}
        ></button>

        <button
          onClick={handleShowVideo}
          style={{
            display: showMenuButton ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "10px",
            //   backgroundColor: "white",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: showVideo ? 0.8 : 0.3,
            cursor: "pointer"
          }}
        ></button>

        <button
          onClick={handleShowMenuButton}
          style={{
            // visibility: showMenuButton ? "visible" : "hidden",
            display: "block",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            top: 0,
            right: 0,
            //   backgroundColor: "white",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: showMenuButton ? 0.3 : 0.0,
            cursor: showMenuButton ? "pointer" : "none",
            color: "white"
          }}
        >Hidden</button>

       
       <ButtonChangeScene showButton={showMenuButton} />
          
          <ButtonChangeResolutionVideo showButton={showMenuButton} />

          <ButtonChangeControls showButton={showMenuButton} />

          <ButtonChangeXRMode showButton={showMenuButton} />

   

 

        {/* GBA Buttons */}
        {/* <button
          onClick={handleToggleIsGbaVisible}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "170px",
            right: "100px",
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
          }}
        ></button> */}
        {/* <button
          onClick={handleToggleIsGbaRemoved}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "170px",
            right: "190px", // Cambiar el right del handleToggleIsDisplayTextureGbaGame
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
          }}
        ></button> */}
        {/* <button
          onClick={handleToggleIsDisplayTextureGbaGame}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "170px",
            right: "190px",
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
          }}
        ></button> */}
        {/* <button
          onClick={handleToggleIsOccludeBlending}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "170px",
            right: "10px",
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
          }}
        ></button> */}
      </FullScreen>
    </div>
  );
}
