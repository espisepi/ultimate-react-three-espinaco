import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import TextTessellationManager from './TextTessellationManager';
import useVideo from '../../hooks/useVideo';

export default function TextTessellation({ text = 'Text Default', size = 40, ...props }) {
  const [textManager] = useState(() => new TextTessellationManager());
  const video = useVideo();

  const {scene} = useThree();

  useEffect(() => {
    if(text && size && textManager && video && scene) {
      textManager.initialize(text, size, video, scene);

      return () => {
        textManager.dispose();
      }
    }
  }, [text, size, textManager, video, scene]);

  useFrame((state) => {
    textManager.update(state.clock);
  });

  return null;
  // return textManager.mesh ? <primitive object={textManager.mesh} {...props} /> : null;
}
