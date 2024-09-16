import { useSceneStore } from "../../store/SceneStore";

export default function ButtonChangeScene({ showButton = true }) {

  // SceneManagerStore =========================================
  const sceneId = useSceneStore((state) => state.sceneId);
  const setSceneId = useSceneStore((state) => state.setSceneId);
  const maxNumScenes = useSceneStore((state) => state.maxNumScenes);

  // Onclick button function
  const handleChangeScene = () => {
    const newSceneId = (sceneId + 1) % maxNumScenes;
    setSceneId(newSceneId);
  };
  return (
    <>
      <button
        onClick={handleChangeScene}
        style={{
          // visibility: showMenuButton ? "visible" : "hidden",
          display: showButton ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          top: 100,
          right: 0,
          //   backgroundColor: "white",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: showButton ? 0.3 : 0.0,
          // cursor: showMenuButton ? "pointer" : "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        Scene
      </button>
    </>
  );
}
