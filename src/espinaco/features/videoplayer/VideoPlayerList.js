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
        color: "#636363",
      }}
    >
      <h2>Videos</h2>
      <ul style={{ height: 100, overflow: "auto", paddingRight: "100px" }}>
        {videos.map((video) => (
          <li style={{ listStyle: "none" }} key={video.name}>
            <button
              style={{
                backgroundColor: "#636363",
                border: "none",
                borderRadius: "25px",
              }}
              onClick={() => selectVideo(video)}
            >
              {video.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
