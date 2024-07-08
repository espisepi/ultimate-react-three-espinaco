import { useVideoPlayerStore } from "./hook/useVideoPlayerStore";


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
      {/* <h2>Videos</h2> */}
      <ul
        style={{
          height: "45vh",
          width: "70vw",
          overflow: "auto",
          paddingRight: "1.1rem",
        }}
      >
        {videos.map((video) => (
          <li style={{ listStyle: "none" }} key={video.name}>
            <button
              style={{
                // backgroundColor: "#636363",
                background: "rgba(163, 163, 163, .1)",
                color: "#a0b0c0",
                border: "none",
                borderRadius: "15px",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                padding: "0.2rem 1rem",
                width: "100%",
                textAlign: "start",
                cursor:"pointer"
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
