import { useAppStore } from "../../app-module/store/AppStore";
import ControlsManager from "../../features/react-three-drei-espinaco/controls/manager/ControlsManager";
import ControlsManagerXR from "../../features/react-three-drei-espinaco/controls/manager/ControlsManagerXR";
import { SceneRouter } from "../../features/react-three-drei-espinaco/scene-module/router/SceneRouter";
import CanvasDefault from "./CanvasDefault";
import CanvasXR from "./CanvasXR";



export function CanvasManager() {
      const xrmode = useAppStore((state) => state.xrmode);

    return (
        <>
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
            <SceneRouter />
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
            <SceneRouter />
          </CanvasDefault>
        )}
        </>
    )
}