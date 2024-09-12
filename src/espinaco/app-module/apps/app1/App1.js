import React, { useEffect, useState, useCallback } from "react";
import VideoPlayer from "../../../features/videoplayer/pages/VideoPlayer";
import { useAppStore } from "../../../app-module/store/AppStore";
import ButtonChangeControls from "../../../features/react-three-drei-espinaco/controls/manager/components/buttons/ButtonChangeControls";
import { ButtonChangeXRMode } from "../../../features/react-three-drei-espinaco/components/button-change-xr-mode/ButtonChangeXRMode";
import ButtonChangeResolutionVideo from "../../../features/videoplayer/components/buttons/ButtonChangeResolutionVideo";
import ButtonChangeScene from "../../../features/react-three-drei-espinaco/scene-module/components/buttons/ButtonChangeScene";
import ButtonOrbitControlsAutorotate from "../../../features/react-three-drei-espinaco/controls/orbitControls/components/buttons/ButtonOrbitControlsAutorotate";
import FullScreen from "../../../features/fullscreen/FullScreen";
import InputRangeVideoPointsScale from "../../../features/react-three-drei-espinaco/prefabs/videoPoints/components/dom/buttons/InputRangeVideoPointsScale";
import InputRangeVideoPointsSize from "../../../features/react-three-drei-espinaco/prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsSize";
import InputRangeVideoPointsAmplitudeDistance from "../../../features/react-three-drei-espinaco/prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsAmplitudeDistance";
import { InputRangeStarsPointSize } from "../../../features/react-three-drei-espinaco/prefabs/stars/components/dom/ranges/InputRangeStarsPointSize";
import { InputRangeVideoCurrentTime } from "../../../features/videoplayer/components/ranges/InputRangeVideoCurrentTime";
import { CanvasManager } from "../../../features/react-three-drei-espinaco/components/canvas/CanvasManager";
import { ClickToStart } from "../../../components/clickToStart/ClickToStart";
import "./App1.css";
import { UIRouter } from "./features/ui/router/UIRouter";

const window_showVideo = window.showVideo || false;

export default function App1({}) {
  return (
    <>
      <ClickToStart password="">
        <App1Start />
      </ClickToStart>
    </>
  );
}

export function App1Start() {
  const displayVideoplayer = useAppStore(
    (state) => state.displayVideoplayer,
  );

  //======================================

  const [showVideo, setShowVideo] = useState(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !showVideo);
  }, [showVideo]);

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

  // Show Menu Secondary
  // const [showMenuSecondary, setShowMenuSecondary] = useState(true);
  // const handleShowMenuSecondary = useCallback(() => {
  //   setShowMenuSecondary((v) => !showMenuSecondary);
  // }, [showVideo]);

  // const showGBA = useScene1Store((state) => state.showGBA);
  // const setShowGBA = useScene1Store((state) => state.setShowGBA);

  return (
    <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
      <FullScreen showButton={showVideo}>
        <CanvasManager />

        <UIRouter />

        {displayVideoplayer && <VideoPlayer showUI={showVideo} />}

        <InputRangeVideoPointsSize showUI={showVideo} />

        <InputRangeVideoPointsAmplitudeDistance showUI={showVideo} />

        <InputRangeVideoPointsScale showUI={showVideo} />

        <InputRangeStarsPointSize showUI={showVideo} />

        <InputRangeVideoCurrentTime showUI={showVideo} />

        <ButtonOrbitControlsAutorotate showButton={showVideo} />

        <ButtonChangeScene showButton={showMenuButton} />

        <ButtonChangeResolutionVideo showButton={showMenuButton} />

        <ButtonChangeControls showButton={showMenuButton} />

        <ButtonChangeXRMode showButton={showMenuButton} />

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
            color: "white",
          }}
        >
          Menu
        </button>

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
      </FullScreen>
    </div>
  );
}
