import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
  import { phy, math } from 'phy-engine';
import { useVideoTexture } from "../../../../../../../videoplayer/hook/useVideoTexture";

const Vehicle = () => {
  const { scene, renderer } = useThree();
  const vehicleRef = useRef();
  const videoTexture = useVideoTexture();

  useEffect(() => {
  if (!phy || typeof phy.init !== "function") {
    console.error("Phy.js no está correctamente importado o no tiene init().");
    return;
  }
  if(!videoTexture) {
    return;
  }

  const materialVideoTexture = new THREE.MeshBasicMaterial({
            // color:new THREE.Color("red"),
            map: videoTexture
        });

    // init phy-engine
  phy.init({
	type:'PHYSX', 
	worker:true,
	compact:true,
	scene:scene,
	renderer:renderer,
	callback:physicsReady,
  })

  function physicsReady (){
	// phy.set({ substep:1, gravity:[0,-9.81,0], fps:60 });
	// phy.add({ type:'plane', size:[300,1,300], material:'shadow', visible:true });

    // phy.log('use key WSAD or ZSQD<br>SPACE to handbrake')

      phy.set({ substep:1, gravity:[0,-9.81,0] })

    phy.add({ type:'plane' })

    phy.add({
        type:'highSphere', name:'sphere',
        size:[0.50], pos:[1,6,0], density:5, restitution:0.2, friction:0.2, sleep:true,
        material: materialVideoTexture });

    addTower({ radius:1, height:25, size:[0.1, 0.2], detail:18, pos:[2,0,0] });
    addTower({ radius:1, height:25, size:[0.1, 0.2], detail:18, pos:[-2,0,0] });

    phy.setTimeout( run, 1000 );

};

function run () {
    // phy.up is use for direct outside update
    phy.change({ name:'sphere', wake:true });
}
  


const addTower = ( o ) => {

    let tx, ty, tz;
    let detail =  o.detail === "undefined" ? 10 : o.detail;
    let density =  o.density === "undefined" ? 1 : o.density;

    if(o.pos){
        tx = o.pos[0]; ty = o.pos[1]; tz = o.pos[2]
    } else {
        tx = ty = tz = 0;
    }

    let px, py, pz, angle, rad
    let radius = o.radius || 1
    let height = o.height || 1
    let sx = o.size[0] || 1, sy = o.size[1] || 1, sz = radius * 6 / detail

    for(let j = 0; j < height; j++){
        for(let i = 0; i < detail; i++){

            rad = radius;
            angle = (Math.PI * 2 / detail * (i + (j & 1) * 0.5))
            px = tx + Math.cos(angle) * rad;
            py = (ty + sy + j * sy) - (sy*0.5)
            pz = tz - Math.sin(angle) * rad

            phy.add({
                instance:'boxbase',
                type:"box",
                radius:0.02,
                size:[sx,sy,sz],
                pos:[px,py,pz],
                rot  :[0,angle*(180 / Math.PI),0],
                //density:density,
                mass:0.1,
                restitution:0.6,
                friction:0.4,
                sleep:true,
                startSleep:true,
                material: materialVideoTexture
            });
        }
    }
}

//   phy.init({ gravity: [0, -9.81, 0] });
//   phy.add({ type: "plane" });

//   const vehicle = phy.add({
//     type: "vehicle",
//     name: "car",
//     mesh: { type: "box", size: [1.5, 0.5, 3] },
//     position: [0, 1, 0],
//     wheel: [{ radius: 0.4, width: 0.3 }, { radius: 0.4, width: 0.3 }],
//   });

//   vehicleRef.current = vehicle;
//   scene.add(vehicle.mesh);

  return () => {
    // phy.remove(vehicle);
  };
}, [scene, videoTexture]);
  return null;
};

export default Vehicle;