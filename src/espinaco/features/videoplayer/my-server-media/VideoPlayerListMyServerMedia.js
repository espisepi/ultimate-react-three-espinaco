import { useEffect, useState } from "react";
import { useVideoPlayerStore } from "./VideoPlayerStoreMyServerMedia";

// Función para eliminar tildes y diacríticos
const normalizeText = text =>
  text
    .normalize("NFD") // Descompone los caracteres en la forma de normalización de descomposición canónica
    .replace(/[\u0300-\u036f]/g, "") // Elimina las marcas diacríticas usando una expresión regular
    .toLowerCase(); // Convierte el texto a minúsculas para hacer la búsqueda insensible a mayúsculas


export default function VideoPlayerListMyServerMedia({ showUI = true }) {
  const videos = useVideoPlayerStore((state) => state.videos);
  const selectVideo = useVideoPlayerStore((state) => state.selectVideo);
  const fetchVideos = useVideoPlayerStore((state) => state.fetchVideos);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Buscador ==================
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(videos);

  // Fix para que aparezcan los videos al empezar la app
  useEffect(()=>{
    setSearchResults(value=>videos);
  },[videos]);

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
    } else {
      // Divide el término de búsqueda en palabras y normaliza
      const searchWords = value.trim().split(/\s+/).map(word => normalizeText(word));
      const results = videos.filter(video =>
        // Verifica que cada palabra de búsqueda esté contenida en el nombre del video
        searchWords.every(word =>
          normalizeText(video.name).includes(word)
        )
      );
      setSearchResults(results);
    }
  };
  // FIN Buscador ==================

  // Fix para cuando no se busquen videos se muestre todos los videos
  useEffect(()=>{
    if(searchTerm==="" && searchResults.length === 0) {
      setSearchResults(value=>videos);
    }
  },[searchTerm,searchResults]);



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
      <div style={{minWidth:"100vw"}}>
        {searchResults.length > 0 ? (
          <ul style={{ height: "45vh", overflow: "auto", paddingRight: "100px", maxWidth: "79%" }}>
            {searchResults.map((video, index) => (
              <li key={index} style={{ listStyle: "none" }}><button
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
            </button></li>
            ))}
          </ul>
        ) : (
          searchTerm && <p>Not video found.</p>
        )}
      </div>
      {/* <ul style={{ height: "45vh", overflow: "auto", paddingRight: "100px", width: "79%" }}>
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
      </ul> */}
      <div style={{textAlign: "right", paddingRight: "11rem"}}>
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
