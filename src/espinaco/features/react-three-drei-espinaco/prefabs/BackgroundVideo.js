import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import useVideo from '../../hooks/useVideo';

export default function BackgroundVideo({videoId = 'video'}) {

    const video = useVideo(videoId);
    
	const { scene } = useThree();
	useEffect(()=>{
		if(video){
			const textureVideo = new THREE.VideoTexture(video);
			textureVideo.minFilter = THREE.LinearFilter;
			textureVideo.magFilter = THREE.LinearFilter;
			textureVideo.format = THREE.RGBFormat;
			scene.background = textureVideo;
		}
	}, [video]);

	return null;
}