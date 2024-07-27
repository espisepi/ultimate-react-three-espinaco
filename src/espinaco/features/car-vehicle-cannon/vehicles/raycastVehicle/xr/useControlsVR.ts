import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import { useXRControllerState } from "@react-three/xr";
import * as THREE from "three";

function useControlsVROculus(
  { current }: MutableRefObject<Record<GameControl, boolean>>,
  map: Record<ButtonName, GameControl>
) {
  const leftController = useXRControllerState("left");
  const rightController = useXRControllerState("right");

  useEffect(() => {
    const handleButtonChange = () => {
      if (leftController) {
        const thumbstickLeft = leftController.inputSource.gamepad?.axes;
        if (thumbstickLeft) {
          const [x, y] = thumbstickLeft;
          current[map["thumbstick-left"]] = x < -0.5;
          current[map["thumbstick-right"]] = x > 0.5;
          current[map["thumbstick-up"]] = y < -0.5;
          current[map["thumbstick-down"]] = y > 0.5;
        }
      }
      if (rightController) {
        const thumbstickRight = rightController.inputSource.gamepad?.axes;
        if (thumbstickRight) {
          const [x, y] = thumbstickRight;
          current[map["thumbstick-left"]] = x < -0.5;
          current[map["thumbstick-right"]] = x > 0.5;
          current[map["thumbstick-up"]] = y < -0.5;
          current[map["thumbstick-down"]] = y > 0.5;
        }
      }
    };

    handleButtonChange();

    const interval = setInterval(handleButtonChange, 100);

    return () => {
      clearInterval(interval);
    };
  }, [current, map, leftController, rightController]);
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
