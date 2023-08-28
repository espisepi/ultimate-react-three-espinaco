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

// import SceneManager from "./espinaco/scenes/manager/SceneManager";

// import { NippleJoystick } from "./espinaco/controls/NippleJoystick";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Scene1Canvas from "../../scenes/scene1/Scene1";
import VideoPlayer from "../../features/videoplayer/VideoPlayer";
import VideoPlayerScreenCapture from "../../features/videoplayer/VideoPlayerScreenCapture";

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
const window_showVideo = window.showVideo || true;
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

trapani-orale: https://www.youtube.com/watch?v=QIibXiz9jsk
babi - colegas (letra): https://www.youtube.com/watch?v=zDcBO_RVU58
BEJO - Guaña Guaña O O (Vidéo) - https://www.youtube.com/watch?v=zSNcrN63s5I
2. Soto Asa - La Primera (ft. Mala Rodríguez) - https://www.youtube.com/watch?v=iNOLUJ3CzSo
PESI - BLUE - https://www.youtube.com/watch?v=Y7GrwNifWXQ
xYUNG BEEF - INTRO A.D.R.O.M.I.C.F.M.S - https://www.youtube.com/watch?v=HVnXpYyrBbQ
PXXR GVNG ~BURGUNDY~ (STUDIO PERFORMANCE) - https://www.youtube.com/watch?v=tMYBTSm-Hx0
Judeline - CANIJO (Official Video) - https://www.youtube.com/watch?v=SSYhUGsS_9s



Hey Joe - Jimi Hendrix (High Quality).mp4 - https://www.youtube.com/watch?v=cXgHEm3ReDk
Wynton Marsalis & Eric Clapton - Layla - https://www.youtube.com/watch?v=RvNIivHdy0Q
B.B. King - The Thrill Is Gone [Crossroads 2010] (Official Live Video) - youtube.com/watch?v=SgXSomPE_FY
Riders on the Storm - The Doors HD - https://www.youtube.com/watch?v=k9o78-f2mIM
Suena Guernica - Rosalía & Refree, 'Catalina' - https://www.youtube.com/watch?v=6O192OAzMH8

Tokischa - Twerk (Official Video) ft. Eladio Carrión: https://www.youtube.com/watch?v=VAQZ3ZHr22E
Nikita Verevki Ropes Ukrainian group - youtube.com/watch?v=X3Z-WeE5914





CLIO - T'as vu [CLIP OFFICIEL]: https://www.youtube.com/watch?v=9enP5t05wFU
SOKO :: Sweet Sound of Ignorance (Official Video): https://www.youtube.com/watch?v=NnvMSGaj1YE
Paula Cendejas - x ti (Videoclip Oficial): https://www.youtube.com/watch?v=LpeNeyNz1rM
Moha La Squale - Bienvenue à la Banane: https://www.youtube.com/watch?v=96h97kNEgXM
EO - 🔴 1Take (Naija to London) | @MixtapeMadness: https://www.youtube.com/watch?v=Q7PIuH8wuTQ
Joey Bada$$ - 95 Til Infinity (Official Music Video) - https://www.youtube.com/watch?v=N1yGG8jMSTI
Joey Bada$$ - "Christ Conscious" (Official Music Video) - https://www.youtube.com/watch?v=yRfQGXFRr30
Kendrick Lamar - Swimming Pools (Drank) - https://www.youtube.com/watch?v=B5YNiCfWC3A
Future - Life Is Good (Official Music Video) ft. Drake - https://www.youtube.com/watch?v=l0U7SxXHkPY
DaBaby - BOP on Broadway (Hip Hop Musical) - https://www.youtube.com/watch?v=28hYUZMufDg
Ice Spice - Munch (Feelin’ U) (Official Music Video) - https://www.youtube.com/watch?v=-adyojG3gws
Kodak Black - Tunnel Vision [Official Music Video] - https://www.youtube.com/watch?v=JzSUgOmP66Q
Eminem - Lose Yourself [HD] - https://www.youtube.com/watch?v=_Yhyp-_hX2s
Eminem - Superman (Official Music Video) [Explicit] - https://www.youtube.com/watch?v=j5s881UtdLw
Lil Xan - Betrayed - https://www.youtube.com/watch?v=_dL3AygsCMc
Die Antwoord - Enter The Ninja (Official) - https://www.youtube.com/watch?v=wc3f4xU_FfQ






Foxes in Fiction - Ontario Gothic - https://www.youtube.com/watch?v=YeNXFVev8Jg
Cemeteries - Sodus - https://www.youtube.com/watch?v=YxbeynIfzd8
Future Islands - Like the Moon - https://www.youtube.com/watch?v=4S9YtRnlPMk






 * 
 */

// TODO: Poder visualizar un streaming con videoPoints : WEBRTC, grabar pantalla js
// TODO: Subir video desde el movil/pc y reproducirlo

// TODO: Sketchbook con codigo ts dentro de este proyecto react

const DEFAULT_VIDEOPOINTS_POINTSSIZE = 1.5; //Mirar este valor en VideoPointsShader.js -> pointSize: { type: "f", value: 1.5 },
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
  return (
    <div
      className="background-initial"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        color: "black",
        backgroundColor: "#500050",
      }}
      onClick={() => setClicked(true)}
    >
      <h1>Click to Start</h1>
    </div>
  );
}

export function App1Start({ url }) {
  const [clicked, setClicked] = useState(false);

  const [showVideo, setShowVideo] = useState(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !showVideo);
  }, [showVideo]);

  // let firstUrl = url ? BASE_URL_HEROKU_VIDEO_YT_DL + url : window_urlYoutube;
  const firstUrl = "videos/stayHigh.mp4";
  // const [link, setLink] = useState(firstUrl);

  const handleFullScreen = useFullScreenHandle();
  const toggleFullScreen = useCallback(() => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  }, [handleFullScreen]);

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
      if (event.key === "t") {
        setShowMenuButton(true);
        setShowVideo(true);
      }
      if (event.key === "f") {
        setShowMenuButton(false);
        setShowVideo(false);
      }
    }

    // Agregar un event listener al documento para detectar las teclas
    document.addEventListener("keydown", manejarTecla);
    return () => {
      document.removeEventListener("keydown", manejarTecla);
    };
  }, []);

  //================================================

  // TODO: UI Para mostrar todas las canciones y poder cambiar de cancion en la lista de reproduccion que he hecho (la variable dataMusic)
  // TODO: Reproducir canciones aleatoriamente o en bucle la misma cancion (checkbox para elegir la opcion)
  return (
    <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
      <FullScreen handle={handleFullScreen}>
        <Scene1Canvas
          style={{
            position: "relative",
            top: "0",
            width: "100%",
            height: "100vh",
          }}
        />

        <VideoPlayerScreenCapture showUI={showVideo} />

        {/* <VideoPlayerScreenCapture /> */}

        {/* <video id="video" style={{ display: showVideo ? 'block' : 'none', width: '25vw', height: '25vh', top: 0, zIndex: 100, position: 'absolute' }}
            src={link} controls={true} autoPlay={true} crossOrigin="anonymous"></video> */}

        {/* <div id="ui-controls-godCamera" style={{ display: showVideo ? 'block' : 'none', position: "relative" }}> */}
        {/* Aqui se ponen botones visuales para manejar la camara para todos los lados -> Asociar cada boton visual a un boton de teclado cuando se pulse */}
        {/* <NippleJoystick style={{ display: showVideo ? 'block' : 'none' }} /> */}
        {/* </div> */}

        <div
          id="div-input-range-video-point-size"
          style={{
            display: showVideo ? "block" : "none",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            position: "absolute",
            left: 30,
            bottom: 190,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
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
          id="div-input-range-video-point-scale"
          style={{
            display: showVideo ? "block" : "none",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            position: "absolute",
            left: 30,
            bottom: 160,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
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
          style={{
            display: showVideo ? "block" : "none",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            position: "absolute",
            left: 30,
            bottom: 130,
            border: "none",
            borderRadius: "4px",
          }}
        >
          <input
            type="range"
            ref={inputRangeStarsPointSizeRef}
            onChange={(e) => handleStarsPointSize(e.target.value)}
            min={1.0}
            max={1000.0}
            step={1}
            // value={0.0}
          ></input>
        </div>

        <button
          onClick={handleAutoRotate}
          style={{
            display: showVideo ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "200px",
            //   backgroundColor: "#ffff00",
            background: "linear-gradient(90deg, #d27407 0%, #2f1f56 100%)",
            opacity: 0.5,
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
            background: "linear-gradient(90deg, #9220de 0%, #000000 100%)",
            opacity: 0.5,
          }}
        >
          ∫{" "}
        </button>

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
            opacity: showVideo ? 1 : 0.3,
          }}
        ></button>
      </FullScreen>
    </div>
  );
}
