import * as THREE from "three";
import { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { Water } from "three-stdlib";

extend({ Water });

interface WaterProps {
  material: {
    uniforms: {
      time: {
        value: number;
      };
    };
  };
}

export default function Ocean({...props}) {
  const ref = useRef<WaterProps>(null);
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);

  const sunDirection = useMemo(() => {
    const sun = new THREE.Vector3();

    const parameters = {
      elevation: 2,
      azimuth: 180,
    };
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);
    return sun;
  }, []);

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: sunDirection,
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      // @ts-ignore
      format: gl.encoding,
    }),
    // @ts-ignore
    [waterNormals, gl.encoding],
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta;
    }
  });

  // @ts-ignore
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} {...props} />;
}
