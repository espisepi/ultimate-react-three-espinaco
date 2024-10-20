import { useVideoPlayerStore } from "../../hook/useVideoPlayerStore";
import { Video } from "../../store/VideoplayerStoreClass";


interface UploadVideoProps {
  showUI?: boolean;
}

export default function UploadVideo({ showUI = true }: UploadVideoProps) {
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "video/mp4") {
      const videoUrl = URL.createObjectURL(file);
      const video: Video = {
        name: "Local Video",
        url: videoUrl,
      };

      selectVideo(video);
    } else {
      alert("Please upload a valid MP4 video file.");
    }
  };

  return (
    <>
    <div style={{
        position: 'absolute',
        top: 0,
        zIndex: 999,
        display: showUI ? 'block' : 'none'
    }}>
      <input type="file" accept="video/mp4" onChange={handleVideoUpload} />
    </div>
    </>
  );
}
