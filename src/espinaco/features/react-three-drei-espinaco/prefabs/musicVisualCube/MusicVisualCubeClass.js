import * as THREE from "three";

export class MusicVisualCubeClass {
  constructor(scene, mesh1) {
    this.mesh1 = mesh1;
    const geometry = this.createGeometry();
    const material = this.createMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);
  }

  update() {
    const time = performance.now();
    if (this.mesh) {
      this.mesh.rotation.y = time * 0.0005;
      this.mesh.material.uniforms["time"].value = time * 0.005;
      this.mesh.material.uniforms["sineTime"].value = Math.sin(
        this.mesh.material.uniforms["time"].value * 0.05 + 5.0
      );
    }
  }

  createMaterial() {
    return new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
      },
      vertexShader: VERTEXSHADER,
      fragmentShader: FRAGMENTSHADER,
      side: THREE.DoubleSide,
      transparent: true,
    });
  }

  createGeometry() {
    // geometry

    const vector = new THREE.Vector4();

    const instances = 100;

    const positions = [];
    const offsets = [];
    const colors = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push(0.025, -0.025, 0);
    positions.push(-0.025, 0.025, 0);
    positions.push(0, 0, 0.025);

    // geometry1 y geometry2 para posiciones
    const boxBufferGeometry = new THREE.BoxGeometry();
    const boxAttributePosition = boxBufferGeometry.getAttribute("position");
    const boxAttributePositionArray = boxAttributePosition.array;
    const sphereBufferGeometry = new THREE.SphereGeometry();
    const sphereAttributePosition =
      sphereBufferGeometry.getAttribute("position");
    const sphereAttributePositionArray = sphereAttributePosition.array;

    // espisepi: AQUI LO DEJO!! TENGO QUE CORREGIR EL PASO DE UNA POSICION A OTRA POR VERTEX
    // console.log(this.mesh1.geometry.getAttribute("position").array);

    const arrayPosition1 = boxAttributePositionArray;
    const arrayPosition2 = sphereAttributePositionArray;

    // instanced attributes

    for (let i = 0; i < instances; i++) {
      // offsets

      offsets.push(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      );

      // colors

      colors.push(Math.random(), Math.random(), Math.random(), Math.random());

      // orientation start

      // espisepi: Se hace i%instances para que cuando i sea mayor que instances vuelva a 0 y no de error el array
      const lengthArrayPosition1 = arrayPosition1.length;
      // vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
      vector.set(
        arrayPosition1[i % lengthArrayPosition1],
        arrayPosition1[(i + 1) % lengthArrayPosition1],
        arrayPosition1[(i + 2) % lengthArrayPosition1],
        1.0
      );
      vector.normalize();

      orientationsStart.push(vector.x, vector.y, vector.z, vector.w);
      positions.push(vector.x, vector.y, vector.z);

      // orientation end

      // vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
      vector.set(
        arrayPosition2[i % instances],
        arrayPosition2[(i + 1) % instances],
        arrayPosition2[(i + 2) % instances],
        1.0
      );
      vector.normalize();

      orientationsEnd.push(vector.x, vector.y, vector.z, vector.w);
    }

    // console.log(orientationsStart);

    const geometry = new THREE.InstancedBufferGeometry();
    geometry.instanceCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(new Float32Array(colors), 4)
    );
    geometry.setAttribute(
      "orientationStart",
      new THREE.InstancedBufferAttribute(new Float32Array(orientationsStart), 4)
    );
    geometry.setAttribute(
      "orientationEnd",
      new THREE.InstancedBufferAttribute(new Float32Array(orientationsEnd), 4)
    );
    return geometry;
  }
}

const VERTEXSHADER = `
        precision highp float;

		uniform float sineTime;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec3 offset;
		attribute vec4 color;
		attribute vec4 orientationStart;
		attribute vec4 orientationEnd;

		varying vec3 vPosition;
		varying vec4 vColor;

		void main(){

			vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
			vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
			vec3 vcV = cross( orientation.xyz, vPosition );
			vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

			vColor = color;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

		}
`;

const FRAGMENTSHADER = `
    precision highp float;

    uniform float time;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main() {

        vec4 color = vec4( vColor );
        color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

        gl_FragColor = color;

    }
`;
