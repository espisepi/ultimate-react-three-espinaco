import React from "react";
// Nipple ==================
import ReactNipple from "react-nipple";
// optional: include the stylesheet somewhere in your app
import "react-nipple/lib/styles.css";

import { useState, useCallback } from "react";

export function NippleJoystick({ style, showUI = true }) {
  const [isMoveForward, setIsMoveForward] = useState(true);
  const handleIsMoveForward = useCallback(() => {
    setIsMoveForward((v) => !v);
  }, []);

  const handleJoystick = (evt, data) => {
    const angle = data?.direction?.angle || "undefined"; // angle = "down" || "left" || "right" || "up"
    // console.log( angle)
    if (angle === "up") {
      if (isMoveForward) {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "w" }));
      } else {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
      }
    } else {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "w" }));
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "e" }));
    }
    if (angle === "down") {
      if (isMoveForward) {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      } else {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "q" }));
      }
    } else {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "s" }));
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "q" }));
    }
    if (angle === "left") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    } else {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }));
    }
    if (angle === "right") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "d" }));
    } else {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "d" }));
    }
  };

  return (
    <>
      <ReactNipple
        // supports all nipplejs options
        // see https://github.com/yoannmoinet/nipplejs#options
        options={{ mode: "static", position: { bottom: "50%", left: "50%" } }}
        // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
        style={{
          display: showUI ? "block" : "none",
          outline: "1px dashed #ff00ff",
          width: 150,
          height: 150,
          position: "absolute",
          bottom: "50px",
          left: "50vw",
          opacity: 0.5,
          ...style,
          // if you pass position: 'relative', you don't need to import the stylesheet
        }}
        // all events supported by nipplejs are available as callbacks
        // see https://github.com/yoannmoinet/nipplejs#start
        onStart={(evt, data) => handleJoystick(evt, data)}
        onEnd={(evt, data) => handleJoystick(evt, data)}
        onMove={(evt, data) => handleJoystick(evt, data)}
        onDir={(evt, data) => handleJoystick(evt, data)}
        onPlain={(evt, data) => handleJoystick(evt, data)}
        onShown={(evt, data) => handleJoystick(evt, data)}
        onHidden={(evt, data) => handleJoystick(evt, data)}
        onPressure={(evt, data) => handleJoystick(evt, data)}
      />
      <button
        onClick={handleIsMoveForward}
        style={{
          display: showUI ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "200px",
          right: "200px",
          background: isMoveForward
            ? "linear-gradient(90deg, #d27407 0%, #2f1f56 100%)"
            : "linear-gradient(90deg, #9220de 0%, #000000 100%)",
          opacity: 0.5,
        }}
      >
        {" "}
      </button>
    </>
  );
}
