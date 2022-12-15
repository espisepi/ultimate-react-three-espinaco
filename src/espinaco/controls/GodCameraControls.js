
import { useCallback, useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { useFrame, useThree } from "@react-three/fiber";
import useKeyPress from "../hooks/useKeyPress";

const vec = new THREE.Vector3();

const SPEED_MIN_VALUE = 100;
const SPEED_MAX_VALUE = 500;

export default function GodCameraControls() {

    const { camera } = useThree();
    const orbitControls = useRef();

    useEffect(()=>{
        // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
        window.orbitControls = orbitControls?.current;
    },[orbitControls])

    const speedKeyPress = useKeyPress("ShiftLeft");
    const moveForwardKeyPress = useKeyPress("w");
    const moveBackKeyPress = useKeyPress("s")
    const moveLeftKeyPress = useKeyPress("a");
    const moveRightKeyPress = useKeyPress("d");
    

    const moveForward = useCallback( (distance) => {
        vec.setFromMatrixColumn(camera.matrix, 0)
        vec.crossVectors(camera.up, vec)
        camera.position.addScaledVector(vec, distance)
        // console.log(camera.position);
        orbitControls.current.target.addScaledVector(vec, distance)
    }, [] );
    const moveRight = useCallback( (distance) => {
        vec.setFromMatrixColumn(camera.matrix, 0)
        camera.position.addScaledVector(vec, distance)
        orbitControls.current.target.addScaledVector(vec, distance)
    }, [] );

    useFrame((_, delta)=>{
        const speed = speedKeyPress ?  SPEED_MAX_VALUE : SPEED_MIN_VALUE;       
        if(moveForwardKeyPress) {
            // console.log("ARRIBA")
            moveForward(delta * speed)
        }
        if(moveBackKeyPress) {
            moveForward(-delta * speed)
        }
        if(moveRightKeyPress) {
            moveRight(delta * speed)
        }
        if(moveLeftKeyPress) {
            moveRight(-delta * speed)
        }
        // camera.updateMatrixWorld();
    });


    return <OrbitControls ref={orbitControls} />;

}