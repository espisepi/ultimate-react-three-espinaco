// https://threejs.org/examples/?q=tes#webgl_modifier_tessellation
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_tessellation.html
import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
const vertexShader = `
            uniform float amplitude;

			attribute vec3 customColor;
			attribute vec3 displacement;

			varying vec3 vNormal;
			varying vec3 vColor;

			void main() {

				vNormal = normal;
				vColor = customColor;

				vec3 newPosition = position + normal * amplitude * displacement;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

			}
`;
const fragmentShader = `

            uniform float iTime;

            varying vec3 vNormal;
			varying vec3 vColor;

			void main() {

				const float ambient = 0.4;

				vec3 light = vec3( 1.0 );
				light = normalize( light );

				float directional = max( dot( vNormal, light ), 0.0 );

                vec3 colorFinal = vec3(sin(iTime*vNormal.z * 0.5 ),sin(iTime*vColor.g * 0.5 ),sin(iTime*vColor.z * 0.5 ));

				gl_FragColor = vec4( ( directional + ambient ) * colorFinal, 1.0 );

			}

`;

export default function TextTesellation({
  text = "Text Default",
  pointerAnimation = true,
  size = 40,
  ...props
}) {
  const font = useLoader(FontLoader, "helvetiker_bold.typeface.json");

  const [mesh, setMesh] = useState({});

  useEffect(() => {
    let geometry = new TextGeometry(text, {
      font: font,

      size: size,
      height: 5,
      curveSegments: 3,

      bevelThickness: 2,
      bevelSize: 1,
      bevelEnabled: true,
    });

    geometry.center();

    const tessellateModifier = new TessellateModifier(8, 6);
    geometry = tessellateModifier.modify(geometry);

    //

    const numFaces = geometry.attributes.position.count / 3;

    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let f = 0; f < numFaces; f++) {
      const index = 9 * f;

      //   const h = 0.2 * Math.random();
      //   const s = 0.5 + 0.5 * Math.random();
      //   const l = 0.5 + 0.5 * Math.random();

      //   color.setHSL(h, s, l);

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

    geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute(
      "displacement",
      new THREE.BufferAttribute(displacement, 3)
    );

    //

    const uniforms = {
      amplitude: { value: 0.0 },
      iTime: { value: 0.0 },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    //

    const mesh = new THREE.Mesh(geometry, shaderMaterial);

    setMesh(mesh);
  }, [text]);

  useFrame(({ clock, mouse }) => {
    // No visible when pass 2 seconds
    if (mesh && clock.getElapsedTime() > 1.5) {
      mesh.visible = false;
    }
    if (mesh && mesh.material && mesh.material.uniforms.amplitude) {
      mesh.material.uniforms.amplitude.value =
        1.0 + Math.sin(clock.getElapsedTime() * 0.5);
      mesh.material.uniforms.iTime.value = clock.getElapsedTime();
    }
    if (pointerAnimation && mesh && mesh.rotation) {
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, mouse.x * 2, 0.1);
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, mouse.y / 2, 0.1);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mouse.x / 2, 0.1);
    }
  });

  return <primitive object={mesh} {...props} />;
}
