
import * as THREE from 'three';

export async function createVideoTextureFromVideoId(videoId) {
    const videoElement = document.getElementById(videoId);
    if (!videoElement) {
      throw new Error(`No se encontró ningún elemento con el ID "${videoId}".`);
    }

    const videotexture = new THREE.VideoTexture(videoElement);
    videotexture.minFilter = THREE.LinearFilter;
    videotexture.magFilter = THREE.LinearFilter;
    videotexture.format = THREE.RGBAFormat;

    return videotexture;
}  