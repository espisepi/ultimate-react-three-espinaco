/*
 Reference file:
 - https://threejs.org/examples/#webgl_instancing_morph
 - https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_morph.html
*/

import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export class HorseScene {
  private HEIGHT_FROM_BOTTOM = -50;

  private scene: THREE.Scene;
  private model: GLTF;
  private videoTexture: THREE.VideoTexture;

  // Attributes for Horses
  private mesh: THREE.InstancedMesh;
  private mixer: THREE.AnimationMixer;
  private timeOffsets: Float32Array;
  private dummy: THREE.Mesh;

  constructor(scene: THREE.Scene, model: GLTF, videoTexture: THREE.VideoTexture) {
    this.scene = scene;
    this.model = model;
    this.videoTexture = videoTexture;

    this.createScene();
  }

  private createScene() {
    // this.createGround();
    this.createHorses();
  }

  private createGround(): void {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000000, 1000000),
      new THREE.MeshStandardMaterial({ color: 0x669933, depthWrite: true }),
    );

    ground.rotation.x = -Math.PI / 2;
    ground.position.y = this.HEIGHT_FROM_BOTTOM;

    ground.receiveShadow = true;

    this.scene.add(ground);
  }

  private createHorses(): void {
    const scene = this.scene;
    const model = this.model;
    const HEIGHT_FROM_BOTTOM = this.HEIGHT_FROM_BOTTOM;

    let mesh, mixer, dummy;

    const offset = 5000;

    const timeOffsets = new Float32Array(1024);

    for (let i = 0; i < 1024; i++) {
      timeOffsets[i] = Math.random() * 3;
    }

    dummy = model.scene.children[0];

    // mesh = new THREE.InstancedMesh(dummy.geometry, dummy.material, 1024);
    mesh = new THREE.InstancedMesh(dummy.geometry, new THREE.MeshBasicMaterial(), 1024);

    mesh.material.map = this.videoTexture;

    // mesh.material.wireframe = true;

    mesh.scale.set(0.1, 0.1, 0.1);

    // mesh.castShadow = true;

    for (let x = 0, i = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        dummy.position.set(
          offset - 300 * x + 200 * Math.random(),
          HEIGHT_FROM_BOTTOM,
          offset - 300 * y,
        );

        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);

        mesh.setColorAt(
          i,
          new THREE.Color(`hsl(${Math.random() * 360}, 50%, 66%)`),
        );

        i++;
      }
    }

    scene.add(mesh);

    mixer = new THREE.AnimationMixer(model.scene);

    const action = mixer.clipAction(model.animations[0]);

    action.play();

    this.mesh = mesh;
    this.mixer = mixer;
    this.timeOffsets = timeOffsets;
    this.dummy = dummy;

    // call update() method here to fix length error
    this.update(0);
  }

  public update(timestep: number): void {
    const time = timestep;
    if (this.mesh) {
      for (let i = 0; i < 1024; i++) {
        this.mixer.setTime(time + this.timeOffsets[i]);
        this.mesh.setMorphAt(i, this.dummy);
      }
      this.mesh.morphTexture.needsUpdate = true;
    }
  }

  public dispose(): void {
    // Liberar la malla instanciada y sus geometrías y materiales
    if (this.mesh) {
      this.mesh.geometry.dispose();
      if (Array.isArray(this.mesh.material)) {
        this.mesh.material.forEach((material) => material.dispose());
      } else {
        this.mesh.material.dispose();
      }
      this.scene.remove(this.mesh);
    }

    // Liberar el mixer de animación
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.model.scene);
    }

    // Liberar la referencia al modelo para permitir la recolección de basura
    this.model = null;

    // Limpiar las propiedades para evitar referencias a datos no deseados
    this.mesh = null;
    this.mixer = null;
    this.timeOffsets = null;
    this.dummy = null;
  }
}
