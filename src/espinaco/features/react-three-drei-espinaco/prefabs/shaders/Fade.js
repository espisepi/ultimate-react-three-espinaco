import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class Fade extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        effectFactor: { type: "f", value: 1.2 },
        dispFactor: { type: "f", value: 0 },
        texture: { type: "t", value: undefined },
        texture2: { type: "t", value: undefined },
        disp: { type: "t", value: undefined }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `

        // #define texture2D texture

        varying vec2 vUv;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;
        uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;
        void main() {
          vec2 uv = vUv;
          vec4 disp = texture(disp, uv);
          vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor * (disp.r*effectFactor));
          vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));
          vec4 _texture1 = texture2D(texture1, distortedPosition);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);
          vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
          gl_FragColor = finalTexture;
        //   gl_FragColor = vec4(1.0,1.0,0.0,1.0); // For testing reason
        }`
    });
  }

  get texture() {
    return this.uniforms.texture.value;
  }
  set texture(v) {
    this.uniforms.texture.value = v;
  }
  get texture2() {
    return this.uniforms.texture2.value;
  }
  set texture2(v) {
    this.uniforms.texture2.value = v;
  }
  get disp() {
    return this.uniforms.disp.value;
  }
  set disp(v) {
    this.uniforms.disp.value = v;
  }
  get dispFactor() {
    return this.uniforms.dispFactor.value;
  }
  set dispFactor(v) {
    this.uniforms.dispFactor.value = v;
  }
}

// register element in react-spring (a.fade)
// apply({ Fade });
// register element in r3f (<fade />)
extend({ Fade });


// import React, { useState } from "react";
// import * as THREE from "three";
// import { useLoader } from "@react-three/fiber";
// import { useSpring, a } from "react-spring/three";
// import img1 from "./img/img1.jpg";
// import img2 from "./img/img2.jpg";
// import img3 from "./img/disp3.jpg";
// import "./shaders/Fade";
// import "./styles.css";

// export default function App() {
//   const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
//     img1,
//     img2,
//     img3
//   ]);
//   const [hovered, setHover] = useState(false);
//   const { progress } = useSpring({ progress: hovered ? 1 : 0 });
//   return (
//       <mesh
//         onPointerOver={() => setHover(true)}
//         onPointerOut={() => setHover(false)}
//       >
//         <planeBufferGeometry attach="geometry" args={[5, 5]} />
//         <a.fade
//           attach="material"
//           texture={texture1}
//           texture2={texture2}
//           disp={dispTexture}
//           dispFactor={progress}
//         />
//       </mesh>
//   );
// }
