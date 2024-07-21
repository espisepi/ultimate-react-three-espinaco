import * as THREE from 'three';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const vertexShader = `

    uniform float amplitude;

    attribute vec3 customColor;
    attribute vec3 displacement;

    varying vec3 vNormal;
    varying vec3 vColor;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        vNormal = normal;
        vColor = customColor;
        vec3 newPosition = position + normal * amplitude * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
`;

const fragmentShader = `

    uniform float iTime;
    uniform sampler2D videoTexture;

    varying vec3 vNormal;
    varying vec3 vColor;

    varying vec2 vUv;

    void main() {
        const float ambient = 0.5;
        vec3 light = vec3( 1.0 );
        light = normalize( light );
        float directional = max( dot( vNormal, light ), 0.0 );

        //vec3 colorFinal = vec3(sin(iTime*vNormal.z * 0.5 ),sin(iTime*vColor.g * 0.5 ),sin(iTime*vColor.z * 0.5 ));

        vec3 videoColor = texture2D(videoTexture, vUv).rgb;
        //vec3 colorFinal = mix(vColor, videoColor, 0.5) * vec3(sin(iTime * vNormal.z * 0.5), sin(iTime * vColor.g * 0.5), sin(iTime * vColor.z * 0.5));

        gl_FragColor = vec4( ( directional + ambient ) * videoColor, 1.0 );
        //gl_FragColor = vec4( ( directional + ambient ) * colorFinal, 1.0 );
    }
`;

// const fragmentShader = `
//     uniform float iTime;
//     uniform sampler2D videoTexture;
//     varying vec3 vNormal;
//     varying vec3 vColor;
//     varying vec2 vUv;
//     void main() {
//         const float ambient = 0.4;
//         vec3 light = vec3( 1.0 );
//         light = normalize( light );
//         float directional = max( dot( vNormal, light ), 0.0 );
//         vec3 videoColor = texture2D(videoTexture, vUv).rgb;
//         vec3 colorFinal = mix(vColor, videoColor, 0.5) * vec3(sin(iTime * vNormal.z * 0.5), sin(iTime * vColor.g * 0.5), sin(iTime * vColor.z * 0.5));
//         gl_FragColor = vec4( ( directional + ambient ) * colorFinal, 1.0 );
//     }
// `;

class TextTessellationManager {
  constructor() {
    this.mesh = null;
    this.videoTexture = null;
    this.isInitialized = false; // to avoid run initialize method twice
  }

  async initialize(text, size, videoElement, scene) {
    if(this.isInitialized) { return; }
    this.isInitialized = true;
    const fontLoader = new FontLoader();
    const font = await fontLoader.loadAsync('helvetiker_bold.typeface.json');

    let geometry = new TextGeometry(text, {
      font: font,
      size: size,
      depth: 5,
      curveSegments: 3,
      bevelThickness: 2,
      bevelSize: 1,
      bevelEnabled: true,
    });

    geometry.center();

    const tessellateModifier = new TessellateModifier(8, 6);
    geometry = tessellateModifier.modify(geometry);

    const numFaces = geometry.attributes.position.count / 3;

    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let f = 0; f < numFaces; f++) {
      const index = 9 * f;
      color.setHex(0x330033);
      const d = 10 * (0.5 - Math.random());
      for (let i = 0; i < 3; i++) {
        colors[index + 3 * i] = color.r;
        colors[index + 3 * i + 1] = color.g;
        colors[index + 3 * i + 2] = color.b;
        displacement[index + 3 * i] = d;
        displacement[index + 3 * i + 1] = d;
        displacement[index + 3 * i + 2] = d;
      }
    }

    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

    this.videoTexture = new THREE.VideoTexture(videoElement);

    const uniforms = {
      amplitude: { value: 0.0 },
      iTime: { value: 0.0 },
      videoTexture: { value: this.videoTexture },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(this.mesh);

  }

  update(clock) {
    if (this.mesh && this.mesh.material && this.mesh.material.uniforms.amplitude) {
      this.mesh.material.uniforms.amplitude.value = 1.0 + Math.sin(clock.getElapsedTime() * 0.5);
      this.mesh.material.uniforms.iTime.value = clock.getElapsedTime();
    }
  }
}

export default TextTessellationManager;
