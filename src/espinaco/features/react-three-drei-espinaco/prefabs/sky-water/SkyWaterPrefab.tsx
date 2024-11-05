import { Sky } from "@react-three/drei";
import Ocean from "../ocean/Ocean";

export function SkyWaterPrefab() {
  return (
    <>
        <Ocean position={[0,-3,0]}/>
        {/* @ts-ignore */}
        <Sky scale={8000} sunPosition={[500, 150, -8000]} turbidity={0.1} elevation={2} azimuth={180} />
    </>
  );
}
