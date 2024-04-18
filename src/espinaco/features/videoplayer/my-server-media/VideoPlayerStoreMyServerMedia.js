import { create } from "zustand";

export const BASE_URL_HEROKU_VIDEO_YT_DL =
  "https://video-dl-esp.herokuapp.com/video/video?url=";
export const BASE_URL_LOCAL_VIDEO_YT_DL =
  "http://localhost:4000/video/video?url=";
export const BASE_URL_RENDERER_YT_DL =
  "https://video-dl.onrender.com/video/video?url=";

// ----- My Own Server Media // -----
const useMyServer = true; //
// const PATH_MY_SERVER_MEDIA = "http://192.168.1.134:3000";
// const PATH_MY_SERVER_MEDIA = "http://192.168.1.130:3000";
const PATH_MY_SERVER_MEDIA = "http://79.116.40.102:3000";


// ----- Fin My Own Server Media // -----

export const useVideoPlayerStore = create((set, get) => ({
  // My server Media
  videos: [],
  fetchVideos: async () => {
    try {
      const response = await fetch(PATH_MY_SERVER_MEDIA + "/media-list");
      if (!response.ok) {
        throw new Error("Error al obtener la lista de recursos.");
      }
      const data = await response.json();
      set({
        videos: data.mediaFiles
          .map((media) => ({ name: media, url: media })) // Crear objeto video: {name: string, url: string}
          .sort((a, b) => a.name.localeCompare(b.name)), // Ordenarlo alfabeticamente
      });
    } catch (error) {
      console.error(error);
    }
  },
  // Fin My server Media
  selectedVideo: null,
  //selectVideo: (video) => set({ selectedVideo: video }),
  // video: {name: string, url: string}
  selectVideo: (video) => {
    const { selectedVideo } = get();
    console.log({ selectedVideo });
    if (selectedVideo?.url !== video.url) {

      // Modificar atributo zustand
      set({ selectedVideo: video });

      // extraer y procesar url del video
      const url = video.url;
      const url_ready_to_my_server = convertUrlToMyServer(url);
      console.log({ url_ready_to_my_server });
      playLocalVideo(url_ready_to_my_server,set);
      // if (video?.url?.includes("www.youtube.com")) {
      //   fetchAndPlayYoutubeVideo(video.url);
      // } else {
      //   playLocalVideo(video.url);
      // }
    }
  },

  // manejar resoluciones del video (resoluciones aka cambiar el width y height del video xD)
  resolution: { width: 640, height: 360 },
  originalResolution: { width: 640, height: 360 }, // example: { width: 640, height: 360 }
  resolutions: [
    {width: 640, height: 360},
    {width: 800, height: 800},
  ],
  setResolution: (newResolution) => set({ resolution: newResolution }),
  // No lo utilizo porque de momento lo seteo en la funcion de abajo playLocalVideo() y lo hago directamente con el set
  // setOriginalResolution: (width, height) => set({ originalResolution: { width, height } })
  // FIN manejar resoluciones del video =======================================================

}));

function convertUrlToMyServer(url) {
  const path_my_server = PATH_MY_SERVER_MEDIA;
  const url_without_spacing = reemplazarEspaciosConPorcentaje20(url);
  const url_processed = reemplazarAlmohadilla(url_without_spacing);
  return path_my_server + "/media/" + url_processed;
}

function reemplazarEspaciosConPorcentaje20(inputString) {
  // Utiliza la función replace con una expresión regular para buscar y reemplazar los espacios con '%20'
  return inputString.replace(/ /g, "%20");
}

function reemplazarAlmohadilla(inputString) {
  return inputString.replace("#", "%23");
}

function playLocalVideo(localVideoUrl, set /* metodo para poder modificar el estado de zustand */) {

  // Obtener la etiqueta de video
  const videoPlayer = document.getElementById("video");

  console.log(localVideoUrl);

  // Establecer la fuente del video
  videoPlayer.src = localVideoUrl;

  // Reproducir el video (opcional)
  videoPlayer.play();

  // Guardar resolucion original del video
  // Hacemos lo del interval porque todavia no ha podido cargar el video, asi que modificamos los valores cuando lo cargue
  const id_interval = setInterval(()=>{
    if(videoPlayer.videoWidth !== 0 && videoPlayer.videoHeight !== 0 ){
      set({ originalResolution: { width: videoPlayer.videoWidth, height: videoPlayer.videoHeight } });
      clearInterval(id_interval);
    }
  },500);


  // ====== INPUT TEXT YOUTUBE URL ============
  // const inputTextYoutubeUrl = document.getElementById("input-text-youtubeUrl");
  // inputTextYoutubeUrl.value = "";
  // ====== FIN INPUT TEXT YOUTUBE URL ============
}

function fetchAndPlayYoutubeVideo(youtubeUrl) {
  // show Loading
  const loadingEl = document.getElementById("loading");
  loadingEl.style.display = "block";

  // Fetch del video (se hace asi para que funcione en safari)
  fetch(BASE_URL_RENDERER_YT_DL + youtubeUrl)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      // Crear una URL temporal para el blob del video
      const videoBlobUrl = URL.createObjectURL(blob);

      // Obtener la etiqueta de video
      const videoPlayer = document.getElementById("video");

      // Establecer la fuente del video
      videoPlayer.src = videoBlobUrl;

      // Reproducir el video (opcional)
      videoPlayer.play();

      // hidden Loading
      const loadingEl = document.getElementById("loading");
      loadingEl.style.display = "none";

      // ====== INPUT TEXT YOUTUBE URL ============
      // const inputTextYoutubeUrl = document.getElementById(
      //   "input-text-youtubeUrl"
      // );
      // inputTextYoutubeUrl.value = "";
      // ====== FIN INPUT TEXT YOUTUBE URL ============
    })
    .catch((error) => {
      console.error("Error al cargar el video:", error);
    });
}
