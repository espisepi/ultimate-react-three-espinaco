import React from "react";

import Screen from "../../prefabs/screen/Screen";
import Stars from "../../prefabs/stars/Stars";

// https://codesandbox.io/p/sandbox/volumetric-light-godray-yggpw5?file=%2Fsrc%2FApp.js



export function Scene2() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight />

      <Screen />

      <Stars />
    </>
  );
}