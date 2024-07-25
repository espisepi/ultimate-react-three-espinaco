import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";
import VideoPlayer from "../../features/videoplayer/components/VideoPlayer";
import useVideo from "../../features/videoplayer/hook/useVideo";
import SceneManager from "../../scenes/manager/SceneManager";
import CanvasDefault from "../../components/canvas/CanvasDefault";
import CanvasXR from "../../components/canvas/CanvasXR";
import useAppManagerStore from "../manager/store/AppManagerStore";
import ControlsManager from "../../controls/manager/ControlsManager";
import ControlsManagerXR from "../../controls/manager/ControlsManagerXR";
import ButtonChangeControls from "../../controls/manager/components/buttons/ButtonChangeControls";
import ButtonChangeXRMode from "../manager/components/buttons/ButtonChangeXRMode";
import ButtonChangeResolutionVideo from "../../features/videoplayer/components/buttons/ButtonChangeResolutionVideo";
import ButtonChangeScene from "../../scenes/manager/components/buttons/ButtonChangeScene";
import ButtonOrbitControlsAutorotate from "../../controls/orbitControls/components/buttons/ButtonOrbitControlsAutorotate";
import FullScreen from "../../features/fullscreen/FullScreen";
import InputRangeVideoPointsScale from "../../prefabs/videoPoints/components/dom/buttons/InputRangeVideoPointsScale";
import InputRangeVideoPointsSize from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsSize";
import InputRangeVideoPointsAmplitudeDistance from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsAmplitudeDistance";
import { InputRangeStarsPointSize } from "../../prefabs/stars/components/dom/ranges/InputRangeStarsPointSize";


const window_showVideo = window.showVideo || false;


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

        <InputRangeStarsPointSize showUI={showVideo} />

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
