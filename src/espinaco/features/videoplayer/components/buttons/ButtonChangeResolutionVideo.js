import { useCallback, useState } from "react";
import { useVideoPlayerStore } from "../../hook/useVideoPlayerStore";

export default function ButtonChangeResolutionVideo({ showButton = true }) {
  // Resolution manager =============================
  // Obtener todo el tema de las resoluciones del video
  // const resolution = useVideoPlayerStore((state) => state.resolution);
  const originalResolution = useVideoPlayerStore(
    (state) => state.originalResolution
  );
  const resolutions = useVideoPlayerStore((state) => state.resolutions);
  const setResolution = useVideoPlayerStore((state) => state.setResolution);
  const [resolutionOptionSelected, setResolutionOptionSelected] = useState(1);
  const handleChangeResolutionVideo = useCallback(() => {
    // Manejamos la opcion seleccionada
    // console.log({resolutionOptionSelected});
    if (resolutionOptionSelected <= resolutions.length - 1) {
      // console.log(
      //   "selected resolution: ",
      //   resolutions[resolutionOptionSelected]
      // );
      setResolution(resolutions[resolutionOptionSelected]);
    } else {
      // console.log("original selected resolution: ", originalResolution);
      setResolution(originalResolution);
    }

    // Aumenta el contador para que se cambie la resolucion cada vez que se ejecuta este metodo aka cada vez que se hace click en el boton que tiene asociado este metodo
    // similar a poner: resolutionOptionSelected = (resolutionOptionSelected + 1) % resolutions.length
    // similar a poner: contador = (contador + 1) % limiteDelContador
    // Esto hace que resolutionOptionSelected contenga los valores: [ 0, resolutions.length ]
    setResolutionOptionSelected(
      (value) => (value + 1) % (resolutions.length + 1)
    );
  }, [originalResolution, resolutions, resolutionOptionSelected]);

  return (
    <>
      <button
        onClick={handleChangeResolutionVideo}
        style={{
          // visibility: showMenuButton ? "visible" : "hidden",
          display: showButton ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          top: 200,
          right: 0,
          //   backgroundColor: "white",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: showButton ? 0.3 : 0.0,
          // cursor: showMenuButton ? "pointer" : "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        Resolution video
      </button>
    </>
  );
}
