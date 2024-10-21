import React, { useEffect, useState, useCallback } from "react";
import VideoPlayer from "../../../videoplayer/pages/VideoPlayer";
import { useAppVideoPointsStore } from "./store/AppVideoPointsStore";
import ButtonChangeControls from "./features/controls-module/manager/components/buttons/ButtonChangeControls";
import { ButtonChangeXRMode } from "./components/button-change-xr-mode/ButtonChangeXRMode";
import ButtonChangeResolutionVideo from "../../../videoplayer/components/buttons/ButtonChangeResolutionVideo";
import ButtonChangeScene from "./features/scene-module/components/buttons/ButtonChangeScene";
import ButtonOrbitControlsAutorotate from "../../controls/orbitControls/components/buttons/ButtonOrbitControlsAutorotate";
import FullScreen from "../../../fullscreen/FullScreen";
import InputRangeVideoPointsScale from "../../prefabs/videoPoints/components/dom/buttons/InputRangeVideoPointsScale";
import InputRangeVideoPointsSize from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsSize";
import InputRangeVideoPointsAmplitudeDistance from "../../prefabs/videoPoints/components/dom/ranges/InputRangeVideoPointsAmplitudeDistance";
import { InputRangeStarsPointSize } from "../../prefabs/stars/components/dom/ranges/InputRangeStarsPointSize";
import { InputRangeVideoCurrentTime } from "../../../videoplayer/components/ranges/InputRangeVideoCurrentTime";
import { CanvasManager } from "./components/canvas/CanvasManager";
import { ClickToStart } from "../../../../components/clickToStart/ClickToStart";
import "./AppVideoPoints.css";
import { UIRouter } from "./features/ui/router/UIRouter";
import UIApp from "./features/ui-new/UIApp";

const window_showVideo = (window as any).showVideo || false;

export function AppVideoPoints(): JSX.Element {
  return (
    <>
      <ClickToStart password="">
        <AppVideoPointsStart />
      </ClickToStart>
    </>
  );
}

export function AppVideoPointsStart(): JSX.Element {
  const displayVideoplayer = useAppVideoPointsStore((state) => state.displayVideoplayer);

  // State hooks
  const [showVideo, setShowVideo] = useState<boolean>(window_showVideo);
  const handleShowVideo = useCallback(() => {
    setShowVideo((v) => !v);
  }, []);

  const [showMenuButton, setShowMenuButton] = useState<boolean>(true);

  // Effects
  useEffect(() => {
    function manejarTecla(event: KeyboardEvent) {
      if (event.key === "2") {
        setShowMenuButton(true);
        setShowVideo(true);
      }
      if (event.key === "1") {
        setShowMenuButton(false);
        setShowVideo(false);
      }
      if (event.key === "3") {
        (window as any).orbitControls.autoRotate = !(window as any).orbitControls.autoRotate;
      }
    }

    // Add an event listener to the document to detect key presses
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

  return (
    <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
      <FullScreen showButton={showVideo}>
        <CanvasManager />

        {/* <UIApp /> */}
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
            display: "block",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            top: 0,
            right: 0,
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
