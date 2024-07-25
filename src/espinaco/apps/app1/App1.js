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
import ButtonOrbitControlsAutorotate from "../../controls/orbitControls/components/buttons/ButtonOrbitControlsAutorotate";
import FullScreen from "../../features/fullscreen/FullScreen";
import InputRangeVideoPointsScale from "../../prefabs/videoPoints/components/dom/buttons/InputRangeVideoPointsScale";
import InputRangeVideoPointsSize from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsSize";
import InputRangeVideoPointsAmplitudeDistance from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsAmplitudeDistance";

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

const DEFAULT_STARS_POINTSIZE = 55;
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
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === contrasenia || true) {
      setClicked(true);
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
      <input type="text" value={inputValue} onChange={handleChange} />
    </div>
  );
}

export function App1Start({ url }) {
  const xrmode = useAppManagerStore((state) => state.xrmode);
  const displayVideoplayer = useAppManagerStore(
    (state) => state.displayVideoplayer
  );

  //======================================

  const [showVideo, setShowVideo] = useState(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !showVideo);
  }, [showVideo]);

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

  // TODO: UI Para mostrar todas las canciones y poder cambiar de cancion en la lista de reproduccion que he hecho (la variable dataMusic)
  // TODO: Reproducir canciones aleatoriamente o en bucle la misma cancion (checkbox para elegir la opcion)
  return (
    <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
      <FullScreen showButton={showVideo}>
        {xrmode ? (
          <CanvasXR
            style={{
              position: "relative",
              top: "0",
              width: "100%",
              height: "100vh",
            }}
          >
            <ControlsManagerXR />
            <SceneManager />
          </CanvasXR>
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
          </CanvasDefault>
        )}

        {/* <CanvasRecord /> */}
        {displayVideoplayer && <VideoPlayer showUI={showVideo} />}

        <InputRangeVideoPointsSize showUI={showVideo} />

        <InputRangeVideoPointsAmplitudeDistance showUI={showVideo} />

        <InputRangeVideoPointsScale showUI={showVideo} />

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

  

        <ButtonOrbitControlsAutorotate showButton={showVideo} />

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
            cursor: "pointer",
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
            color: "white",
          }}
        >
          Hidden
        </button>

        <ButtonChangeScene showButton={showMenuButton} />

        <ButtonChangeResolutionVideo showButton={showMenuButton} />

        <ButtonChangeControls showButton={showMenuButton} />

        <ButtonChangeXRMode showButton={showMenuButton} />
      </FullScreen>
    </div>
  );
}
