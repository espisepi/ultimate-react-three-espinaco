import { env } from "../../../config/env";
import { StateCreator } from "zustand";

export interface Resolution {
  width: number;
  height: number;
}

export interface Video {
  name: string;
  url: string;
}

export interface VideoPlayerStoreState {
  videos: Video[];
  selectedVideo: Video | null;
  resolution: Resolution;
  originalResolution: Resolution;
  resolutions: Resolution[];
}

export class VideoPlayerStoreClass {
  private set: (
    partial: Partial<VideoPlayerStoreState>,
    replace?: boolean,
  ) => void;

  private get: () => VideoPlayerStoreState;

  public videos: Video[];
  public selectedVideo: Video | null;
  public resolution: Resolution;
  public originalResolution: Resolution;
  public resolutions: Resolution[];

  constructor(
    set: (partial: Partial<VideoPlayerStoreState>, replace?: boolean) => void,
    get: () => VideoPlayerStoreState,
  ) {
    this.set = set;
    this.get = get;

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

  async fetchVideos(): Promise<void> {
    try {
      const response = await fetch(`${env.PATH_MY_SERVER_MEDIA}/media-list`);
      if (!response.ok)
        throw new Error("Error al obtener la lista de recursos.");

      const data = await response.json();
      this.set({
        videos: data.mediaFiles
          .map((media: string) => ({ name: media, url: media }))
          .sort((a: Video, b: Video) => a.name.localeCompare(b.name)),
      });
    } catch (error) {
      console.error(error);
    }
  }

  selectVideo(video: Video, optionServer: number = 0): void {
    const { selectedVideo } = this.get();
    if (selectedVideo?.url !== video?.url) {
      this.set({ selectedVideo: video });
      this.handleVideoSelection(video.url, optionServer);
    }
  }

  setResolution(newResolution: Resolution): void {
    this.set({ resolution: newResolution });
  }

  private handleVideoSelection(url: string, optionServer: number): void {
    if (optionServer === 0) {
      this.playLocalVideo(url);
    } else if (optionServer === 1) {
      const urlReadyToMyServer = this.convertUrlToMyServer(url);
      this.playLocalVideo(urlReadyToMyServer);
    } else {
      this.playLocalVideo(url);
    }
  }

  private convertUrlToMyServer(url: string): string {
    const pathMyServer = env.PATH_MY_SERVER_MEDIA;
    const urlWithoutSpacing = this.replaceSpacesWithPercent20(url);
    const urlProcessed = this.replaceHashSymbol(urlWithoutSpacing);
    return `${pathMyServer}/media/${urlProcessed}`;
  }

  private replaceSpacesWithPercent20(inputString: string): string {
    return inputString.replace(/ /g, "%20");
  }

  private replaceHashSymbol(inputString: string): string {
    return inputString.replace("#", "%23");
  }

  private playLocalVideo(localVideoUrl: string): void {
    const videoPlayer = document.getElementById("video") as HTMLVideoElement;

    videoPlayer.src = localVideoUrl;
    videoPlayer.play();

    const idInterval = setInterval(() => {
      if (videoPlayer.videoWidth !== 0 && videoPlayer.videoHeight !== 0) {
        this.set({
          originalResolution: {
            width: videoPlayer.videoWidth,
            height: videoPlayer.videoHeight,
          },
        });
        clearInterval(idInterval);
      }
    }, 500);
  }

  async fetchAndPlayYoutubeVideo(youtubeUrl: string): Promise<void> {
    const loadingEl = document.getElementById("loading") as HTMLElement;
    loadingEl.style.display = "block";

    try {
      const response = await fetch(`${env.BASE_URL_YT_DL_SERVER}${youtubeUrl}`);
      const blob = await response.blob();
      const videoBlobUrl = URL.createObjectURL(blob);
      const videoPlayer = document.getElementById("video") as HTMLVideoElement;
      videoPlayer.src = videoBlobUrl;
      videoPlayer.play();
      loadingEl.style.display = "none";
    } catch (error) {
      console.error("Error al cargar el video:", error);
    }
  }
}
