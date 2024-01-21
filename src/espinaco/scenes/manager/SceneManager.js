import React from "react";
import Scene1Canvas from "../scene1/Scene1";
import Scene2Canvas from "../scene2/Scene2";

export default function SceneManager({
  id = "1",
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
}) {
  switch (id) {
    case "1":
      return <Scene1Canvas style={style} />;
    case "2":
      return <Scene2Canvas style={style} />;
    default:
      alert("No se ha definido la Scene elegida, Scene: " + id);
      return null;
  }
}
