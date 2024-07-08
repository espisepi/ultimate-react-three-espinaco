import { create } from "zustand";
import VideoPlayerStoreClass from "../store/VideoplayerStoreClass";


export const useVideoPlayerStore = create((set, get) => {
  const videoPlayer = new VideoPlayerStoreClass(set, get);
  return {
    videos: videoPlayer.videos,
    selectedVideo: videoPlayer.selectedVideo,
    resolution: videoPlayer.resolution,
    originalResolution: videoPlayer.originalResolution,
    resolutions: videoPlayer.resolutions,
    fetchVideos: videoPlayer.fetchVideos.bind(videoPlayer),
    selectVideo: videoPlayer.selectVideo.bind(videoPlayer),
    setResolution: videoPlayer.setResolution.bind(videoPlayer),
  };
});
