import React, { useEffect } from "react";
import { RaycastVehicle } from "./vehicles/raycastVehicle/RaycastVehicle";
import { CameraFollowObject } from "../../controls/cameraFollowObject/CameraFollowObject";

type CarVehicleCannonProps = {};

export const CarVehicleCannon: React.FC<CarVehicleCannonProps> = React.memo(
  () => {
    return (
      <>
        <RaycastVehicle />
        <CameraFollowObject name="car" position={[0,0.6,-4.0]} rotation={[0,3.1,0]} />
      </>
    );
  }
);
