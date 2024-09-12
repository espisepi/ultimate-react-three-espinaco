import { useCallback, useState } from "react";
import { useVideoPlayerStore } from "../../hook/useVideoPlayerStore";

interface ButtonChangeResolutionVideoProps {
  showButton?: boolean;
}

export default function ButtonChangeResolutionVideo({
  showButton = true,
}: ButtonChangeResolutionVideoProps) {
  // Resolution manager =============================
  // Obtener todo el tema de las resoluciones del video
  const originalResolution = useVideoPlayerStore(
    (state) => state.originalResolution
  );
  const resolutions = useVideoPlayerStore((state) => state.resolutions);
  const setResolution = useVideoPlayerStore((state) => state.setResolution);
  const [resolutionOptionSelected, setResolutionOptionSelected] = useState<number>(1);

  const handleChangeResolutionVideo = useCallback(() => {
    // Manejamos la opcion seleccionada
    if (resolutionOptionSelected <= resolutions.length - 1) {
      setResolution(resolutions[resolutionOptionSelected]);
    } else {
      setResolution(originalResolution);
    }

    setResolutionOptionSelected(
      (value) => (value + 1) % (resolutions.length + 1)
    );
  }, [originalResolution, resolutions, resolutionOptionSelected, setResolution]);

  return (
    <button
      onClick={handleChangeResolutionVideo}
      style={{
        display: showButton ? "block" : "none",
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        position: "absolute",
        top: 200,
        right: 0,
        background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
        opacity: showButton ? 0.3 : 0.0,
        cursor: "pointer",
        color: "white",
      }}
    >
      Resolution video
    </button>
  );
}
