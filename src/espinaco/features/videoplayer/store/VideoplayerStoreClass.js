import { env } from "../../../config/env";

class VideoPlayerStoreClass {

  // zustand attributes get, set
  constructor(set, get) {

    // zustand attributes
    this.set = set;
    this.get = get;

    // attributes
    this.videos = [];
    this.selectedVideo = null;
    this.resolution = { width: 640, height: 360 };
    this.originalResolution = { width: 640, height: 360 };
    this.resolutions = [
      { width: 640, height: 360 },
      { width: 220, height: 140 },
      { width: 800, height: 800 },
    ];
  }

  async fetchVideos() {
    try {
      const response = await fetch(`${env.PATH_MY_SERVER_MEDIA}/media-list`);
      if (!response.ok) throw new Error("Error al obtener la lista de recursos.");
      
      const data = await response.json();
      this.set({
        videos: data.mediaFiles
          .map(media => ({ name: media, url: media }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      });
    } catch (error) {
      console.error(error);
    }
  }

  selectVideo(video, optionServer = 1) {
    const { selectedVideo } = this.get();
    // console.log({ selectedVideo });
    if (selectedVideo?.url !== video?.url) {
      this.set({ selectedVideo: video });
      this.handleVideoSelection(video.url, optionServer);
    }
  }

  setResolution(newResolution) {
    this.set({ resolution: newResolution });
  }

  handleVideoSelection(url, optionServer) {
    if (optionServer === 0) {
      // console.log("Reproduciendo video alojado en esta aplicacion");
      this.playLocalVideo(url);
    } else if (optionServer === 1) {
      // console.log("Reproduciendo video del servidor rasp");
      const urlReadyToMyServer = this.convertUrlToMyServer(url);
      // console.log({ urlReadyToMyServer });
      this.playLocalVideo(urlReadyToMyServer);
    } else {
      // console.log("Reproduciendo video alojado en esta aplicacion");
      this.playLocalVideo(url);
    }
  }

  convertUrlToMyServer(url) {
    const pathMyServer = env.PATH_MY_SERVER_MEDIA;
    const urlWithoutSpacing = this.replaceSpacesWithPercent20(url);
    const urlProcessed = this.replaceHashSymbol(urlWithoutSpacing);
    return `${pathMyServer}/media/${urlProcessed}`;
  }

  replaceSpacesWithPercent20(inputString) {
    return inputString.replace(/ /g, "%20");
  }

  replaceHashSymbol(inputString) {
    return inputString.replace("#", "%23");
  }

  playLocalVideo(localVideoUrl) {
    const videoPlayer = document.getElementById("video");

    // console.log(localVideoUrl);
    videoPlayer.src = localVideoUrl;
    videoPlayer.play();

    const idInterval = setInterval(() => {
      if (videoPlayer.videoWidth !== 0 && videoPlayer.videoHeight !== 0) {
        this.set({ originalResolution: { width: videoPlayer.videoWidth, height: videoPlayer.videoHeight } });
        clearInterval(idInterval);
      }
    }, 500);
  }

  async fetchAndPlayYoutubeVideo(youtubeUrl) {
    const loadingEl = document.getElementById("loading");
    loadingEl.style.display = "block";

    try {
      const response = await fetch(`${env.BASE_URL_YT_DL_SERVER}${youtubeUrl}`);
      const blob = await response.blob();
      const videoBlobUrl = URL.createObjectURL(blob);
      const videoPlayer = document.getElementById("video");
      videoPlayer.src = videoBlobUrl;
      videoPlayer.play();
      loadingEl.style.display = "none";
    } catch (error) {
      console.error("Error al cargar el video:", error);
    }
  }
}

export default VideoPlayerStoreClass;