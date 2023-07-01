import { suspend } from "suspend-react"
import { createAudio, createAudioFromVideoId } from "./createAudio"
import { useFrame } from "@react-three/fiber"

export function Zoom({ url }) {
    // This will *not* re-create a new audio source, suspense is always cached,
    // so this will just access (or create and then cache) the source according to the url
    const { data } = suspend(() => createAudioFromVideoId(url), [url])
    return useFrame((state) => {
      // Set the cameras field of view according to the frequency average
      state.camera.fov = 25 - data.avg / 15
      state.camera.updateProjectionMatrix()
    })
  }