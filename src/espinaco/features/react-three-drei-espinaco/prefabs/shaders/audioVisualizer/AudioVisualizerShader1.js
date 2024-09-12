
import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class AudioVisualizerShader1 extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iTime: { type: "f", value: 0 },
        iResolution:  { value: new THREE.Vector3(1, 1, 1) },

        iChannel0: { type: "t", value: undefined } // THREE.Texture
      },
      vertexShader: `
      varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
        `,
      fragmentShader: `

      #include <common>

      uniform sampler2D iChannel0;
	  varying vec2 vUv;

        void main() {

            vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );
            vec3 color = vec3( 1.0, 1.0, 0.0 );

            float f = texture2D( iChannel0, vec2( vUv.x, 0.0 ) ).r;

            float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

            gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );

        }

    `
    });
  }

  get iTime() {
    return this.uniforms.iTime.value;
  }
  set iTime(v) {
    this.uniforms.iTime.value = v;
  }

  get iResolution() {
      return this.uniforms.iResolution.value;
  }
  set iResolution(v) {
      return this.uniforms.iResolution.value = v;
  }

  get iChannel0() {
    return this.uniforms.iChannel0.value;
  }
  set iChannel0(v) {
    return this.uniforms.iChannel0.value = v;
  }
  
}

// @react-three/fiber: With code below I can use <VideoPointShader attach='material'>
extend({ AudioVisualizerShader1 });


