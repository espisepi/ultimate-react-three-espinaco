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

 * 
 */

const dataMusic = [
  {
    name: "Tove Lo - Habits (Stay High)",
    link: "videos/stayHigh.mp4",
  },
  {
    name: "HOKE - MOONDIAL",
    link: "videos/HOKE-MOONDIAL.mp4",
  },
  {
    name: "youtube",
    link:
      BASE_URL_HEROKU_VIDEO_YT_DL +
      "https://www.youtube.com/watch?v=ZelTFpXStE8",
    // link:'http://localhost:4000/video/video?url=https://www.youtube.com/watch?v=0wa1HzC7OY8'  // For Testing in local
  },
  {
    name: "Kaydy Cain - Perdedores del Barrio, highkili ay linda,",
    link:
      BASE_URL_HEROKU_VIDEO_YT_DL +
      "https://www.youtube.com/watch?v=ZelTFpXStE8",
  },
  {
    name: "sotoasa jugador, trueno, ",
    link:
      BASE_URL_HEROKU_VIDEO_YT_DL +
      "https://www.youtube.com/watch?v=ZelTFpXStE8",
  },
  {
    name: "Kaydy Cain - Perdedores del Barrio",
    link:
      BASE_URL_HEROKU_VIDEO_YT_DL +
      "https://www.youtube.com/watch?v=ZelTFpXStE8",
  },
];

let isFirstTime = true;

export default function App1({ url }) {
  const [clicked, setClicked] = useState(false);

  const [showVideo, setShowVideo] = useState(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !showVideo);
  }, [showVideo]);

  // let firstUrl = url ? BASE_URL_HEROKU_VIDEO_YT_DL + url : window_urlYoutube;
  const firstUrl = "videos/stayHigh.mp4";
  // const [link, setLink] = useState(firstUrl);

  const handleInputText = useCallback((youtubeUrl) => {
    // const youtubeUrl = event.target.value;

    // setLink((v) => BASE_URL_LOCAL_VIDEO_YT_DL + youtubeUrl);
    // setLink((v) => BASE_URL_HEROKU_VIDEO_YT_DL + youtubeUrl);
    // setLink((v) => BASE_URL_RENDERER_YT_DL + youtubeUrl);

    // show Loading
    const loadingEl = document.getElementById("loading");
    loadingEl.style.display = "block";

    // Fetch del video (se hace asi para que funcione en safari)
    fetch(BASE_URL_RENDERER_YT_DL + youtubeUrl)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        // Crear una URL temporal para el blob del video
        const videoBlobUrl = URL.createObjectURL(blob);

        // Obtener la etiqueta de video
        const videoPlayer = document.getElementById("video");

        // Establecer la fuente del video
        videoPlayer.src = videoBlobUrl;

        // Reproducir el video (opcional)
        videoPlayer.play();

        // hidden Loading
        const loadingEl = document.getElementById("loading");
        loadingEl.style.display = "none";
      })
      .catch((error) => {
        console.error("Error al cargar el video:", error);
      });
  }, []);

  // Code for Safari reasons
  useEffect(() => {
    const id_interval = setInterval(() => {
      const videoPlayer = document.getElementById("video");
      if (videoPlayer) {
        if (isFirstTime) {
          isFirstTime = false;

          // get url param
          const queryString = window.location.search;
          console.log(queryString);
          const urlParams = new URLSearchParams(queryString);
          const youtubeUrl = urlParams.get("url");
          console.log(youtubeUrl);
          if (youtubeUrl) {
            handleInputText(youtubeUrl);
          } else {
            // Se ejecuta con la cancion por defecto definida en la etiqueta video
            videoPlayer.play();
          }
        }
        clearInterval(id_interval);
      }
    }, 500);
  }, []);

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

  const handleVideoPointSize = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.material.uniforms.pointSize.value = value;
    }
  }, []);

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

  // TODO: UI Para mostrar todas las canciones y poder cambiar de cancion en la lista de reproduccion que he hecho (la variable dataMusic)

  if (clicked) {
    return (
      <div id="app-espinaco" style={{ position: "relative" }}>
        <FullScreen handle={handleFullScreen}>
          <Scene1Canvas
            style={{
              position: "relative",
              top: "0",
              width: "100%",
              height: "100vh",
            }}
          />

          <video
            id="video"
            style={{
              display: "none",
              // visibility: "hidden",
              // width: "25vw",
              // height: "25vh",
              // top: 0,
              // zIndex: 100,
              // position: "absolute",
            }}
            src="videos/stayHigh.mp4" // despues se sustituye por la url insertada
            // controls={false}
            // autoPlay={true}
            playsInline={true}
            loop={true}
            crossOrigin="anonymous"
          ></video>

          <h1
            id="loading"
            style={{
              color: "white",
              zIndex: 999,
              position: "absolute",
              top: 0,
              display: "none",
            }}
          >
            Loading...
          </h1>

          {/* <video id="video" style={{ display: showVideo ? 'block' : 'none', width: '25vw', height: '25vh', top: 0, zIndex: 100, position: 'absolute' }}
            src={link} controls={true} autoPlay={true} crossOrigin="anonymous"></video> */}

          {/* <div id="ui-controls-godCamera" style={{ display: showVideo ? 'block' : 'none', position: "relative" }}> */}
          {/* Aqui se ponen botones visuales para manejar la camara para todos los lados -> Asociar cada boton visual a un boton de teclado cuando se pulse */}
          {/* <NippleJoystick style={{ display: showVideo ? 'block' : 'none' }} /> */}
          {/* </div> */}

          <input
            type="text"
            placeholder="Insert url from youtube like https://www.youtube.com/watch?v=ZelTFpXStE8"
            onChange={(e) => handleInputText(e.target.value)}
            style={{
              display: showVideo ? "block" : "none",
              border: "none",
              borderRadius: "4px",
              width: "50vw",
              height: "30px",
              position: "absolute",
              top: "20px",
              left: "40%",
              background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
              padding: "0.2rem 1rem",
            }}
          />

          <div
            id="div-input-range-video-point-size"
            style={{
              display: showVideo ? "block" : "none",

              background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
              position: "absolute",
              bottom: 30,
              border: "none",
              borderRadius: "4px",
            }}
          >
            <input
              type="range"
              onChange={(e) => handleVideoPointSize(e.target.value)}
              min={0.1}
              max={7.0}
              step={0.1}
              value={0.0}
            ></input>
          </div>

          <div
            id="div-input-range-stars-size"
            style={{
              display: showVideo ? "block" : "none",
              background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
              position: "absolute",
              bottom: 60,
              border: "none",
              borderRadius: "4px",
            }}
          >
            <input
              type="range"
              onChange={(e) => handleStarsPointSize(e.target.value)}
              min={1.0}
              max={1000.0}
              step={1}
              value={0.0}
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
            {" "}
          </button>

          <button
            onClick={handleShowVideo}
            style={{
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
