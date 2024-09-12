import { create } from "zustand";
import { VideoPlayerStoreClass } from "../store/VideoplayerStoreClass"; // Asegúrate de que este archivo esté bien definido

export interface VideoPlayerStoreState {
  videos: any[]; // Define el tipo adecuado para los videos si es necesario
  selectedVideo: any; // Define el tipo adecuado para el video seleccionado
  resolution: { width: number; height: number }; // Usamos un objeto para las resoluciones
  originalResolution: { width: number; height: number };
  resolutions: { width: number; height: number }[]; // Lista de resoluciones como objetos
  fetchVideos: () => Promise<void>; // Método para obtener videos
  selectVideo: (video: any, optionServer?: number) => void; // Método para seleccionar un video
  setResolution: (resolution: { width: number; height: number }) => void; // Método para cambiar la resolución
}

export const useVideoPlayerStore = create<VideoPlayerStoreState>((set, get) => {
  const videoPlayer = new VideoPlayerStoreClass(
    (partial: Partial<VideoPlayerStoreState>) => set(partial), // Pasamos el set con Partial
    () => get() // Y el get para obtener el estado actual
  );

  return {
    videos: videoPlayer.videos,
    selectedVideo: videoPlayer.selectedVideo,
    resolution: videoPlayer.resolution,
    originalResolution: videoPlayer.originalResolution,
    resolutions: videoPlayer.resolutions,
    fetchVideos: videoPlayer.fetchVideos.bind(videoPlayer), // Bind para asegurar el contexto correcto
    selectVideo: videoPlayer.selectVideo.bind(videoPlayer),
    setResolution: videoPlayer.setResolution.bind(videoPlayer),
  };
});
