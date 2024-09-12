import type { BoxProps, WheelInfoOptions } from "@react-three/cannon";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";

import { Chassis } from "../Chassis";
import { useControlsVR } from "./useControlsVR";
import { Wheel } from "../Wheel";
import { useXRControllerState } from "@react-three/xr";

export type VehicleProps = Required<
  Pick<BoxProps, "angularVelocity" | "position" | "rotation">
> & {
  back?: number;
  force?: number;
  front?: number;
  height?: number;
  maxBrake?: number;
  radius?: number;
  steer?: number;
  width?: number;
};

function Vehicle({
  angularVelocity,
  back = -1.15,
  force = 1500,
  front = 1.3,
  height = -0.04,
  maxBrake = 50,
  position,
  radius = 0.7,
  rotation,
  steer = 0.5, // Permite giros mas agresivos
  width = 1.2,
}: VehicleProps) {
  const wheels = [
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
  ];

  // const controls = useControlsVR() // this file is not used because not work
  const leftController = useXRControllerState("left");
  const rightController = useXRControllerState("right");

  const wheelInfoFront: WheelInfoOptions = {
    axleLocal: [-1, 0, 0],
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0],
    frictionSlip: 2, // Friccion normal para las ruedas delanteras
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfoBack: WheelInfoOptions = {
    ...wheelInfoFront,
    frictionSlip: 0.8, // Baja fricción para las ruedas traseras para facilitar el drift
  };

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfoFront,
    chassisConnectionPointLocal: [-width / 2, height, front],
    isFrontWheel: true,
  };
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfoFront,
    chassisConnectionPointLocal: [width / 2, height, front],
    isFrontWheel: true,
  };
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfoBack,
    chassisConnectionPointLocal: [-width / 2, height, back],
    isFrontWheel: false,
  };
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfoBack,
    chassisConnectionPointLocal: [width / 2, height, back],
    isFrontWheel: false,
  };

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: [1.7, 1, 4],
      mass: 500, // Aumenta la masa del chasis para mejorar la estabilidad
      onCollide: (e) => console.log("bonk", e.body.userData),
      position,
      rotation,
    }),
    useRef<Mesh>(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels,
    }),
    useRef<Group>(null)
  );

  // useEffect(() => vehicleApi.sliding.subscribe((v) => console.log('sliding', v)), [])

  useFrame(() => {
    // const { backward, brake, forward, left, reset, right, handbrake } = controls.current
    let { backward, brake, forward, left, reset, right, handbrake } = {
      backward: false,
      brake: false,
      forward: false,
      left: false,
      reset: false,
      right: false,
      handbrake: false,
    };
    // Get VR Controls
    if (rightController == null || leftController == null) {
      return;
    }

    // Left controllers ========================
    const thumstickStateLeft = leftController.gamepad["xr-standard-thumbstick"];
    if (thumstickStateLeft == null) {
      return;
    }

    const xAxisLeft = thumstickStateLeft.xAxis ?? 0;
    const yAxisLeft = thumstickStateLeft.yAxis ?? 0;

    if (xAxisLeft < 0.0) {
      left = true;
    }
    if (xAxisLeft > 0.0) {
      right = true;
    }
    if (-yAxisLeft < 0.0) {
      backward = true;
    }
    if (-yAxisLeft > 0.0) {
      // forward = true;
    }
    // FIN Left controllers ========================


    // Right controllers ========================
    const thumstickStateRight = rightController.gamepad["xr-standard-thumbstick"];
    if (thumstickStateRight == null) {
      return;
    }

    const xAxisRight = thumstickStateRight.xAxis ?? 0;
    const yAxisRight = thumstickStateRight.yAxis ?? 0;

    if (xAxisRight < 0.0) {
      // left = true;
    }
    if (xAxisRight > 0.0) {
      // right = true;
    }
    if (-yAxisRight < 0.1) {
      handbrake = true;
    }
    if (-yAxisRight > 0.1) {
      forward = true;
    }
    // FIN Right controllers ========================


    for (let e = 2; e < 4; e++) {
      vehicleApi.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -1 : 1) : 0,
        e
      );
    }

    for (let s = 0; s < 2; s++) {
      vehicleApi.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );
    }

    for (let b = 2; b < 4; b++) {
      vehicleApi.setBrake(
        brake || handbrake ? maxBrake * (handbrake ? 2 : 1) : 0,
        b
      );
    }

    if (reset) {
      chassisApi.position.set(...position);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(...angularVelocity);
      chassisApi.rotation.set(...rotation);
    }
  });

  return (
    <group ref={vehicle} position={[0, -0.4, 0]}>
      <Chassis ref={chassisBody} />
      <Wheel ref={wheels[0]} radius={radius} leftSide />
      <Wheel ref={wheels[1]} radius={radius} />
      <Wheel ref={wheels[2]} radius={radius} leftSide />
      <Wheel ref={wheels[3]} radius={radius} />
    </group>
  );
}

export default Vehicle;
