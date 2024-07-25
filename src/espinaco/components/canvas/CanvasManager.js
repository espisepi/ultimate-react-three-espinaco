import useAppManagerStore from "../../apps/manager/store/AppManagerStore";
import ControlsManager from "../../controls/manager/ControlsManager";
import ControlsManagerXR from "../../controls/manager/ControlsManagerXR";
import SceneManager from "../../scenes/manager/SceneManager";
import CanvasDefault from "./CanvasDefault";
import CanvasXR from "./CanvasXR";



export function CanvasManager() {
      const xrmode = useAppManagerStore((state) => state.xrmode);

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
        </>
    )
}