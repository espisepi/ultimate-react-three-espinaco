import * as THREE from "three";
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry,
} from "three/addons/misc/RollerCoaster.js";

export default class RollercoasterControlsClass {
  constructor({ scene, camera, video, isWireframe = false, isColor = false }) {
    let geometry, material, mesh;

    const train = new THREE.Object3D();
    scene.add(train);
    train.add(camera);

    const PI2 = Math.PI * 2;

    const SIZE_ROLLERCOASTER = 5;
    const SIZE_FUNCHAIRS = 2;

    const curve = (function () {
      const vector = new THREE.Vector3();
      const vector2 = new THREE.Vector3();

      return {
        getPointAt: function (t) {
          t = t * PI2;

          const x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
          const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
          const z = Math.sin(t) * Math.sin(t * 4) * 50;

          return vector.set(x, y, z).multiplyScalar(SIZE_ROLLERCOASTER);
        },

        getTangentAt: function (t) {
          const delta = 0.0001;
          const t1 = Math.max(0, t - delta);
          const t2 = Math.min(1, t + delta);

          return vector2
            .copy(this.getPointAt(t2))
            .sub(this.getPointAt(t1))
            .normalize();
        },
      };
    })();

    geometry = new RollerCoasterGeometry(curve, 1500);
    material = new THREE.MeshPhongMaterial({
      vertexColors: isColor,
      wireframe: isWireframe,
      map: new THREE.VideoTexture(video)
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    geometry = new RollerCoasterLiftersGeometry(curve, 100);
    material = new THREE.MeshPhongMaterial({wireframe: isWireframe, map: new THREE.VideoTexture(video)});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.1;
    scene.add(mesh);

    geometry = new RollerCoasterShadowGeometry(curve, 500);
    material = new THREE.MeshBasicMaterial({
      color: isColor ? 0x305000 : null,
      depthWrite: false,
      transparent: true,
      wireframe: isWireframe,
      map: new THREE.VideoTexture(video)
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.1;
    scene.add(mesh);

    const funfairs = [];

    //

    geometry = new THREE.CylinderGeometry(10, 10, 5, 15);
    material = new THREE.MeshLambertMaterial({
      color: isColor ? 0xff8080 : null,
      wireframe: isWireframe,
      map: new THREE.VideoTexture(video)
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-80, 10, -70);
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);

    funfairs.push(mesh);

    geometry = new THREE.CylinderGeometry(5, 6, 4, 10);
    material = new THREE.MeshLambertMaterial({
      color:  isColor ? 0x8080ff : null,
      wireframe: isWireframe,
      map: new THREE.VideoTexture(video)
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(50, 2, 30);
    scene.add(mesh);

    funfairs.push(mesh);

    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshLambertMaterial({
      color:  isColor ? 0x8080ff : null,
      wireframe: isWireframe,
      map: new THREE.VideoTexture(video)
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 2, 50);
    scene.add(mesh);

    funfairs.push(mesh);

    // scale funchairs
    for (let i = 0; i < funfairs.length; i++) {
      funfairs[i].scale.set(SIZE_FUNCHAIRS, SIZE_FUNCHAIRS, SIZE_FUNCHAIRS);
      console.log(funfairs[i].scale)
    }


    //

    const position = new THREE.Vector3();
    const tangent = new THREE.Vector3();

    const lookAt = new THREE.Vector3();

    let velocity = 0;
    let progress = 0;

    let prevTime = performance.now();

    // Used variables in update method
    this.prevTime = prevTime;
    this.funfairs = funfairs;
    this.progress = progress;
    this.position = position;
    this.curve = curve;
    this.train = train;
    this.tangent = tangent;
    this.velocity = velocity;
    this.lookAt = lookAt;

  }

  update() {
    const time = performance.now();
    const delta = time - this.prevTime;

    for (let i = 0; i < this.funfairs.length; i++) {
      this.funfairs[i].rotation.y = time * 0.0004;
    }

    //

    this.progress += this.velocity;
    this.progress = this.progress % 1;

    this.position.copy(this.curve.getPointAt(this.progress));
    this.position.y += 0.3;

    this.train.position.copy(this.position);

    this.tangent.copy(this.curve.getTangentAt(this.progress));

    this.velocity -= this.tangent.y * 0.0000001 * delta;
    this.velocity = Math.max(0.00004, Math.min(0.0002, this.velocity));

    this.train.lookAt(this.lookAt.copy(this.position).sub(this.tangent));

    //

    // renderer.render(scene, camera);

    this.prevTime = time;
  }
}
