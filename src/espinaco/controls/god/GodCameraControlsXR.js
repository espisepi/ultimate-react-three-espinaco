import { useFrame } from "@react-three/fiber"
import { XROrigin, useXRControllerState } from "@react-three/xr"
import { useRef } from "react"



export default function GodCameraControlsXR() {
  const controller = useXRControllerState('right')
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current == null || controller == null) {
      return
    }
    const thumstickState = controller.gamepad['xr-standard-thumbstick']
    if (thumstickState == null) {
      return
    }
    ref.current.position.x += (thumstickState.xAxis ?? 0) * delta
    ref.current.position.z += (thumstickState.yAxis ?? 0) * delta
  })
  return <XROrigin ref={ref} />
}