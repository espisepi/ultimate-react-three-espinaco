import React, { useEffect } from "react";
import { RaycastVehicle } from "./vehicles/raycastVehicle/RaycastVehicle";

type CarVehicleCannonProps = {};

export const CarVehicleCannon: React.FC<CarVehicleCannonProps> = React.memo(() => {
  console.log("HELLO Car Vehicle CANNON");
  useEffect(() => {
    console.log("useeffect");
    return () => {
      console.log("useefect destruido");
    }
  }, []);
  return <RaycastVehicle />;
});
