import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import { useXR } from "@react-three/xr";

function useControlsVROculus(
  { current }: MutableRefObject<Record<GameControl, boolean>>,
  map: Record<ButtonName, GameControl>
) {
  const { controllers } = useXR();

  useEffect(() => {
    const handleButtonDown = (event: any) => {
      const buttonName = event.data.name as unknown;
      if (!isButtonName(buttonName)) return;
      current[map[buttonName]] = true;
    };

    const handleButtonUp = (event: any) => {
      const buttonName = event.data.name as unknown;
      if (!isButtonName(buttonName)) return;
      current[map[buttonName]] = false;
    };

    if (controllers) {
      controllers.forEach((controller: any) => {
        controller.addEventListener("selectstart", handleButtonDown);
        controller.addEventListener("selectend", handleButtonUp);
        controller.addEventListener("squeezestart", handleButtonDown);
        controller.addEventListener("squeezeend", handleButtonUp);
      });
    }

    return () => {
      if (controllers) {
        controllers.forEach((controller: any) => {
          controller.removeEventListener("selectstart", handleButtonDown);
          controller.removeEventListener("selectend", handleButtonUp);
          controller.removeEventListener("squeezestart", handleButtonDown);
          controller.removeEventListener("squeezeend", handleButtonUp);
        });
      }
    };
  }, [current, map, controllers]);
}

const vrControlMap = {
  trigger: "forward",
  squeeze: "brake",
  "thumbstick-up": "forward",
  "thumbstick-down": "backward",
  "thumbstick-left": "left",
  "thumbstick-right": "right",
  "button-x": "reset",
  "button-a": "handbrake",
} as const;

type ButtonName = keyof typeof vrControlMap;
type GameControl = (typeof vrControlMap)[ButtonName];

const buttonNames = Object.keys(vrControlMap) as ButtonName[];
const isButtonName = (v: unknown): v is ButtonName =>
  buttonNames.includes(v as ButtonName);

export function useControlsVR() {
  const controls = useRef<Record<GameControl, boolean>>({
    backward: false,
    brake: false,
    forward: false,
    left: false,
    reset: false,
    right: false,
    handbrake: false,
  });

  useControlsVROculus(controls, vrControlMap);

  return controls;
}
