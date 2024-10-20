import { useEffect } from "react";
import VideoPlayerList from "../components/VideoPlayerList";
import { useVideoPlayerStore } from "../hook/useVideoPlayerStore";
import { normalizeText } from "../utils/normalizeText";
import UploadVideo from "../components/upload-video/UploadVideo";

interface Video {
  name: string;
  url: string;
}

const LOVE_LO_HABITS: Video = {
  name: "Tove Lo - Habits (Stay High)",
  url: "videos/stayHigh.mp4",
};

interface VideoPlayerProps {
  showUI?: boolean;
}

export default function VideoPlayer({ showUI = true }: VideoPlayerProps) {
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);
  const videos = useVideoPlayerStore((state) => state.videos);

  useEffect(() => {
    const urlFull = window.location.href;
    const urlPieces = urlFull.split("/");
    const titleVideo = urlPieces[urlPieces.length - 1];

    if (titleVideo && videos.length !== 0) {
      const video = videos.find((video) => normalizeText(video.name).includes(titleVideo));
      alert(video)
      if (video) {
        selectVideo(video);
      } else {
        selectVideo(LOVE_LO_HABITS);
      }
    } else {
      selectVideo(LOVE_LO_HABITS);
    }
  }, [videos, selectVideo]);

  return (
    <>
      <VideoPlayerList showUI={showUI} />
      <video
        id="video"
        style={{
          display: "none",
        }}
        playsInline
        loop
        crossOrigin="anonymous"
        width={660}
        height={300}
        muted={false}
      ></video>
      <UploadVideo showUI={showUI}/>
    </>
  );
}
