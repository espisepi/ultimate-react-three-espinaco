import React, { useEffect } from "react";
import { RaycastVehicle } from "./vehicles/raycastVehicle/RaycastVehicle";
import { CameraFollowObject } from "../react-three-drei-espinaco/controls/cameraFollowObject/CameraFollowObject";
import { RaycastVehicleVR } from "./vehicles/raycastVehicle/xr/RaycastVehicleVR";
import { CameraFollowObjectVR } from "../react-three-drei-espinaco/controls/cameraFollowObject/CameraFollowObjectVR";

type CarVehicleCannonVRProps = {};

export const CarVehicleCannonVR: React.FC<CarVehicleCannonVRProps> = React.memo(
  () => {
    return (
      <>
        <RaycastVehicleVR />
        <CameraFollowObjectVR name="car" position={[0,0.0,0.0]} rotation={[0.0,3.0,0]} />
      </>
    );
  }
);
