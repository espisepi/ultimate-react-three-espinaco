import React, { ReactNode, CSSProperties } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

interface CanvasDefaultProps {
  style?: CSSProperties;
  children?: ReactNode;
}

export default function CanvasDefault({
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
  children,
}: CanvasDefaultProps): JSX.Element {
  return (
    <Canvas
      style={{ ...style, backgroundColor: "black" }}
      camera={{
        far: 9999999,
      }}
    >
      {children}

      {/* <Stats /> */}
    </Canvas>
  );
}
