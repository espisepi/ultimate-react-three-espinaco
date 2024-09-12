import * as THREE from "three";
import { forwardRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { CubeCamera, Float, MeshReflectorMaterial } from "@react-three/drei";
// import { EffectComposer, GodRays, Bloom } from "@react-three/postprocessing";
// import { easing } from "maath";
import useVideo from "../../../../features/videoplayer/hook/useVideo";

export default function Screen() {
  const [material, set] = useState();
  return (
    <>
      {/** The screen uses postpro godrays */}
      <Emitter ref={set} />
      {/* {material && (
        <EffectComposer disableNormalPass multisampling={8}>
          <GodRays sun={material} exposure={0.34} decay={0.8} blur />
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            luminanceSmoothing={0.0}
            intensity={1}
          />
        </EffectComposer>
      )} */}
    </>
  );
}

const Emitter = forwardRef((props, forwardRef) => {
  //   const [video] = useState(() =>
  //     Object.assign(document.createElement("video"), {
  //       src: "/10.mp4",
  //       crossOrigin: "Anonymous",
  //       loop: true,
  //       muted: true,
  //     })
  //   );
  const video = useVideo();
  useEffect(() => void video?.play(), [video]);
  if (video) {
    return (
      <mesh ref={forwardRef} position={[0, 0, -10]} {...props}>
        <planeGeometry args={[16, 10]} />
        <meshBasicMaterial>
          <videoTexture
            attach="map"
            args={[video]}
            colorSpace={THREE.SRGBColorSpace}
          />
        </meshBasicMaterial>
        <mesh scale={[16.05, 10.05, 1]} position={[0, 0, -0.01]}>
          <planeGeometry />
          <meshBasicMaterial color="black" />
        </mesh>
      </mesh>
    );
  } else {
    return null;
  }
});
