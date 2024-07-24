import CanvasDefault from "../../components/canvas/CanvasDefault";
import CanvasXR from "../../components/canvas/CanvasXR";
import ControlsManager from "../../controls/manager/ControlsManager";
import useControlsStore from "../../controls/store/ControlsStore";
import SceneManager from "../../scenes/manager/SceneManager";
import useAppStore from "../store/AppStore";

export default function App2({ }) {

  const xrmode = useAppStore( state => state.xrmode );

  return (
    <>
      <>
      <h1>TODO: NO APARECE ROLLERCOASTER</h1>
        {xrmode ? (
          <CanvasXR
            style={{
              position: "relative",
              top: "0",
              width: "100%",
              height: "100vh",
            }}
          >
            <ControlsManager
              xrmode={xrmode}
            />
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
            <ControlsManager
              xrmode={xrmode}
            />
            <SceneManager />
          </CanvasDefault>
        )}
      </>
    </>
  );
}
