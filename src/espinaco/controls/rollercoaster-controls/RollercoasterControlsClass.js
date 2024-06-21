import * as THREE from "three";
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry,
} from "three/addons/misc/RollerCoaster.js";


export default class RollercoasterControlsClass {
    constructor({scene,camera}){
        const train = new THREE.Object3D();
        scene.add(train);
        train.add( camera );

        console.log("OYEEEEE",{scene,camera})
    
    }
}