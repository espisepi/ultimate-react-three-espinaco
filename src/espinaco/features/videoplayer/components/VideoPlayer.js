import { useCallback, useEffect } from "react";
// import {
//   BASE_URL_RENDERER_YT_DL,
//   LOVE_LO_HABITS,
//   ROSALIA,
//   useVideoPlayerStore,
// } from "./VideoPlayerStore";
import VideoPlayerList from "./VideoPlayerList";
import { useVideoPlayerStore } from "../hook/useVideoPlayerStore";
import { normalizeText } from "../../../utils/normalizeText";


const LOVE_LO_HABITS = {
  name: "Tove Lo - Habits (Stay High)",
  url: "videos/stayHigh.mp4",
};


export default function VideoPlayer({ showUI = true }) {
  // const selectedVideo = useVideoPlayerStore((state) => state.selectedVideo);
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);
  const videos = useVideoPlayerStore((state) => state.videos);

  

  useEffect(() => {
    // console.log({videos})
    // Obtiene la URL completa
    const urlFull = window.location.href;

    // Divide la URL por '/'
    const urlPieces = urlFull.split('/');

    // Obtiene el último elemento del array, que debería ser 'trapani'
    //  http://localhost:3000/trapani   ->  obtiene "trapani"
    const titleVideo = urlPieces[urlPieces.length - 1];

    // console.log(titleVideo); // Debería mostrar 'trapani'

    if (titleVideo && videos.length !== 0) {
      // find es igual que filter pero te da el primer elemento que encuentre, en vez de un array con todos los elementos que es lo que hace filter
      const video = videos.find(video => normalizeText(video.name).includes(titleVideo))
      if(video) {
        // console.log("Video encontrado! :) : " + video);
        selectVideo(video);
      } else {
        selectVideo(LOVE_LO_HABITS, 0);
      }
    } else {
      selectVideo(LOVE_LO_HABITS, 0);
    }
  }, [videos]);

  // useEffect(() => {
  //   const urlFull = window.location.href;
  //   //?url=https://www.youtube.com/watch?v=JN4gBp3Ss24
  //   const urlYoutube =
  //     urlFull.split("url=").length > 1 ? urlFull.split("url=")[1] : null;
  //   if (urlYoutube) {
  //     selectVideo({ name: "youtube", url: urlYoutube });
  //   } else {
  //     selectVideo(LOVE_LO_HABITS);
  //   }
  // }, []);

  // Code for Safari reasons
  //   useEffect(() => {
  //     const id_interval = setInterval(() => {
  //       const videoPlayer = document.getElementById("video");
  //       if (videoPlayer) {
  //         if (isFirstTime) {
  //           isFirstTime = false;

  //           // get url param
  //           const queryString = window.location.search;
  //           console.log(queryString);
  //           const urlParams = new URLSearchParams(queryString);
  //           const youtubeUrl = urlParams.get("url");
  //           console.log(youtubeUrl);
  //           if (youtubeUrl) {
  //             handleInputText(youtubeUrl);
  //           } else {
  //             // Se ejecuta con la cancion por defecto definida en la etiqueta video
  //             videoPlayer.play();
  //           }
  //         }
  //         clearInterval(id_interval);
  //       }
  //     }, 500);
  //   }, []);

  // const handleInputText = useCallback((youtubeUrl) => {
  //   // console.log("OYEE");
  //   selectVideo({ name: "youtube", url: youtubeUrl });
  //   // const youtubeUrl = event.target.value;
  //   // setLink((v) => BASE_URL_LOCAL_VIDEO_YT_DL + youtubeUrl);
  //   // setLink((v) => BASE_URL_HEROKU_VIDEO_YT_DL + youtubeUrl);
  //   // setLink((v) => BASE_URL_RENDERER_YT_DL + youtubeUrl);
  //   // // show Loading
  //   // const loadingEl = document.getElementById("loading");
  //   // loadingEl.style.display = "block";
  //   // // Fetch del video (se hace asi para que funcione en safari)
  //   // fetch(BASE_URL_RENDERER_YT_DL + youtubeUrl)
  //   //   .then((response) => {
  //   //     return response.blob();
  //   //   })
  //   //   .then((blob) => {
  //   //     // Crear una URL temporal para el blob del video
  //   //     const videoBlobUrl = URL.createObjectURL(blob);
  //   //     // Obtener la etiqueta de video
  //   //     const videoPlayer = document.getElementById("video");
  //   //     // Establecer la fuente del video
  //   //     videoPlayer.src = videoBlobUrl;
  //   //     // Reproducir el video (opcional)
  //   //     videoPlayer.play();
  //   //     // hidden Loading
  //   //     const loadingEl = document.getElementById("loading");
  //   //     loadingEl.style.display = "none";
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error al cargar el video:", error);
  //   //   });
  // }, []);

  return (
    <>
      {/* <VideoPlayerList showUI={showUI} /> */}
      {/* Descomentar para ver la lista de videos de mi servidor privado5 */}
      <VideoPlayerList showUI={showUI} />
      {/* <h1
        id="loading"
        style={{
          color: "white",
          zIndex: 999,
          position: "absolute",
          top: 0,
          display: "none",
        }}
      >
        Loading...
      </h1>

      <input
        id="input-text-youtubeUrl"
        type="text"
        placeholder="Insert url from youtube like https://www.youtube.com/watch?v=ZelTFpXStE8"
        onChange={(e) => handleInputText(e.target.value)}
        style={{
          display: showUI ? "block" : "none",
          border: "none",
          borderRadius: "4px",
          width: "50vw",
          height: "30px",
          position: "absolute",
          top: "20px",
          left: "40%",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          padding: "0.2rem 1rem",
        }}
      /> */}
      <video
        id="video"
        style={{
          display: "none",
          // visibility: "hidden",
          // width: "25vw",
          // height: "25vh",
          // top: 0,
          // zIndex: 100,
          // position: "absolute",
        }}
        // src={selectedVideo.url} // despues se sustituye por la url insertada
        // controls={false}
        // autoPlay={true}
        playsInline={true}
        loop={true}
        crossOrigin="anonymous"
        width={660}
        height={300}
        muted={false}
      ></video>
    </>
  );
}
