import CanvasDefault from "../../components/canvas/CanvasDefault";
import CanvasXR from "../../components/canvas/CanvasXR";
import ControlsManager from "../../controls/manager/ControlsManager";
import SceneManager from "../../scenes/manager/SceneManager";

export default function App2({ xrmode = false, controlId = 1, sceneId = 0 }) {
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
              id_control={controlId}
              id_scene={sceneId}
              xrmode={xrmode}
            />
            <SceneManager id={sceneId} />
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
              id_control={controlId}
              id_scene={sceneId}
              xrmode={xrmode}
            />
            <SceneManager id={sceneId} />
          </CanvasDefault>
        )}
      </>
    </>
  );
}
