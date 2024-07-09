import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import TextTessellationManager from './TextTessellationManager';
import useVideo from '../../hooks/useVideo';

export default function TextTessellation({ text = 'Text Default', size = 40, ...props }) {
  const [textManager] = useState(() => new TextTessellationManager());
  const video = useVideo();

  useEffect(() => {
    if(text, size, textManager, video) {
      textManager.initialize(text, size, video);
    }
  }, [text, size, textManager, video]);

  useFrame((state) => {
    textManager.update(state.clock);
  });

  return textManager.mesh ? <primitive object={textManager.mesh} {...props} /> : null;
}
