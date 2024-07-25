import { useState } from "react";

export default function GBAButtons() {
  const [isGbaVisible, setIsGbaVisible] = useState(true);
  const [isGbaRemoved, setIsGbaRemoved] = useState(false);
  const [isOccludeBlending, setIsOccludeBlending] = useState(false);
  const [isDisplayTextureGbaGame, setIsDisplayTextureGbaGame] = useState(true);
  const handleToggleIsGbaVisible = () => {
    setIsGbaVisible(!isGbaVisible);
  };
  const handleToggleIsGbaRemoved = () => {
    setIsGbaRemoved(!isGbaRemoved);
  };
  const handleToggleIsOccludeBlending = () => {
    setIsOccludeBlending(!isOccludeBlending);
  };
  const handleToggleIsDisplayTextureGbaGame = () => {
    setIsDisplayTextureGbaGame(!isDisplayTextureGbaGame);
  };
  return (
    <>
      {/* GBA Buttons */}
      <button
        onClick={handleToggleIsGbaVisible}
        style={{
          display: showVideo ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "170px",
          right: "100px",
          //   backgroundColor: "#ff00ff",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: 0.5,
        }}
      ></button>
      <button
        onClick={handleToggleIsGbaRemoved}
        style={{
          display: showVideo ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "170px",
          right: "190px", // Cambiar el right del handleToggleIsDisplayTextureGbaGame
          //   backgroundColor: "#ff00ff",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: 0.5,
        }}
      ></button>
      <button
        onClick={handleToggleIsDisplayTextureGbaGame}
        style={{
          display: showVideo ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "170px",
          right: "190px",
          //   backgroundColor: "#ff00ff",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: 0.5,
        }}
      ></button>
      <button
        onClick={handleToggleIsOccludeBlending}
        style={{
          display: showVideo ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "170px",
          right: "10px",
          //   backgroundColor: "#ff00ff",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: 0.5,
        }}
      ></button>
    </>
  );
}
