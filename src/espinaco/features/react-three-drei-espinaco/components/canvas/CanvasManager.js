import { useAppVideoPointsStore } from "../../../../features/react-three-drei-espinaco/apps/videopoints/store/AppVideoPointsStore";
import ControlsManager from "../../controls/manager/ControlsManager";
import ControlsManagerXR from "../../controls/manager/ControlsManagerXR";
import { SceneRouter } from "../../apps/videopoints/features/scene-module/router/SceneRouter";
import CanvasDefault from "./CanvasDefault";
import CanvasXR from "./CanvasXR";



export function CanvasManager() {
      const xrmode = useAppVideoPointsStore((state) => state.xrmode);

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