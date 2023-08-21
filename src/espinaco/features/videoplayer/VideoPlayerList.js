import { useVideoPlayerStore } from "./VideoPlayerStore";

export default function VideoPlayerList({ showUI = true }) {
  const videos = useVideoPlayerStore((state) => state.videos);
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);

  return (
    <div
      style={{
        display: showUI ? "block" : "none",
        position: "absolute",
        top: 0,
      }}
    >
      <h2>Lista de Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.name}>
            <button onClick={() => selectVideo(video)}>{video.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
