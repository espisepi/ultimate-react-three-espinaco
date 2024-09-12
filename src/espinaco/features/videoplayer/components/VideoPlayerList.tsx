import { useEffect, useState, ChangeEvent } from "react";
import { useVideoPlayerStore } from "../hook/useVideoPlayerStore";
import { normalizeText } from "../utils/normalizeText";

interface Video {
  name: string;
  url: string;
}

interface VideoPlayerListProps {
  showUI?: boolean;
}

export default function VideoPlayerList({ showUI = true }: VideoPlayerListProps) {
  const videos = useVideoPlayerStore((state) => state.videos) as Video[];
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);
  const fetchVideos = useVideoPlayerStore((state) => state.fetchVideos);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Buscador ==================
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Video[]>(videos);

  // Fix para que aparezcan los videos al empezar la app
  useEffect(() => {
    setSearchResults(() => videos);
  }, [videos]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
    } else {
      const searchWords = value.trim().split(/\s+/).map((word) => normalizeText(word));
      const results = videos.filter((video) =>
        searchWords.every((word) => normalizeText(video.name).includes(word))
      );
      setSearchResults(results);
    }
  };
  // FIN Buscador ==================

  // Fix para cuando no se busquen videos se muestre todos los videos
  useEffect(() => {
    if (searchTerm === "" && searchResults.length === 0) {
      setSearchResults(() => videos);
    }
  }, [searchTerm, searchResults, videos]);

  // Estilos responsives ===================
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerSearchVideosStyle = {
    paddingRight: windowWidth < 768 ? "1rem" : "11rem",
    textAlign: "right" as const,
  };
  // FIN Estilos responsives ===================

  return (
    <div
      style={{
        width: "100%",
        display: showUI ? "block" : "none",
        position: "absolute",
        top: 0,
        color: "#636363",
      }}
    >
      <div style={{ minWidth: "100vw", minHeight: "48vh" }}>
        {searchResults.length > 0 ? (
          <ul
            style={{
              height: "45vh",
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: "100px",
              maxWidth: "79%",
            }}
          >
            {searchResults.map((video, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <button
                  style={{
                    background: "rgba(163, 163, 163, .1)",
                    color: "#a0b0c0",
                    border: "none",
                    borderRadius: "15px",
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                    padding: "0.2rem 1rem",
                    width: "100%",
                    textAlign: "start",
                    cursor: "pointer",
                  }}
                  onClick={() => selectVideo(video)}
                >
                  {video.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && <p>Not video found.</p>
        )}
      </div>

      <div style={containerSearchVideosStyle}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={handleChange}
          className="input-search"
        />
        <h3>{searchResults.length} videos</h3>
      </div>
    </div>
  );
}
