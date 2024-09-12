import type { BoxProps, WheelInfoOptions } from '@react-three/cannon'
import { useBox, useRaycastVehicle } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { Group, Mesh } from 'three'

import { Chassis } from './Chassis'
import { useControls } from './use-controls'
import { Wheel } from './Wheel'

export type VehicleProps = Required<Pick<BoxProps, 'angularVelocity' | 'position' | 'rotation'>> & {
  back?: number
  force?: number
  front?: number
  height?: number
  maxBrake?: number
  radius?: number
  steer?: number
  width?: number
}

function Vehicle({
  angularVelocity,
  back = -1.4,
  force = 4000, // Fuerza aumentada para simular un motor potente de rally
  front = 1.5,
  height = -0.1,
  maxBrake = 100, // Frenos más potentes para un coche de rally
  position,
  radius = 0.5, // Radios de ruedas más pequeños y realistas
  rotation,
  steer = 0.35, // Menos ángulo de giro para simular un control más realista
  width = 1.6,
}: VehicleProps) {
  const wheels = [useRef<Group>(null), useRef<Group>(null), useRef<Group>(null), useRef<Group>(null)]

  const controls = useControls()

  const wheelInfoFront: WheelInfoOptions = {
    axleLocal: [-1, 0, 0],
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.5, // Un poco más de amortiguación para el terreno irregular
    dampingRelaxation: 6.5, // Amortiguación más relajada para un coche de rally
    directionLocal: [0, -1, 0],
    frictionSlip: 1.5, // Fricción ajustada para buen agarre en distintas superficies
    maxSuspensionForce: 20000, // Suspensión robusta para terrenos difíciles
    maxSuspensionTravel: 0.5, // Mayor recorrido de suspensión para terreno irregular
    radius,
    suspensionRestLength: 0.4, // Longitud de suspensión un poco más larga
    suspensionStiffness: 45, // Suspensión más rígida para manejo en rally
    useCustomSlidingRotationalSpeed: true,
  }

  const wheelInfoBack: WheelInfoOptions = {
    ...wheelInfoFront,
    frictionSlip: 1.2, // Un poco menos de fricción en las ruedas traseras para facilitar el derrape controlado
  }

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfoFront,
    chassisConnectionPointLocal: [-width / 2, height, front],
    isFrontWheel: true,
  }
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfoFront,
    chassisConnectionPointLocal: [width / 2, height, front],
    isFrontWheel: true,
  }
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfoBack,
    chassisConnectionPointLocal: [-width / 2, height, back],
    isFrontWheel: false,
  }
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfoBack,
    chassisConnectionPointLocal: [width / 2, height, back],
    isFrontWheel: false,
  }

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: [1.8, 0.8, 4.2], // Ajustado para reflejar un coche de rally más largo y estrecho
      mass: 1200, // Masa realista para un coche de rally
      onCollide: (e) => console.log('bonk', e.body.userData),
      position,
      rotation,
    }),
    useRef<Mesh>(null),
  )

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels,
    }),
    useRef<Group>(null),
  )

  useFrame(() => {
    const { backward, brake, forward, left, reset, right, handbrake } = controls.current

    for (let e = 2; e < 4; e++) {
      vehicleApi.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, e)
    }

    for (let s = 0; s < 2; s++) {
      vehicleApi.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s)
    }

    for (let b = 2; b < 4; b++) {
      vehicleApi.setBrake(brake || handbrake ? maxBrake * (handbrake ? 2 : 1) : 0, b)
    }

    if (reset) {
      chassisApi.position.set(...position)
      chassisApi.velocity.set(0, 0, 0)
      chassisApi.angularVelocity.set(...angularVelocity)
      chassisApi.rotation.set(...rotation)
    }
  })

  return (
    <group ref={vehicle} position={[0, -0.4, 0]}>
      <Chassis ref={chassisBody} />
      <Wheel ref={wheels[0]} radius={radius} leftSide />
      <Wheel ref={wheels[1]} radius={radius} />
      <Wheel ref={wheels[2]} radius={radius} leftSide />
      <Wheel ref={wheels[3]} radius={radius} />
    </group>
  )
}

export default Vehicle
