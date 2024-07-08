import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import TextTessellationManager from './TextTessellationManager';

export default function TextTessellation({ text = 'Text Default', size = 40, ...props }) {
  const [textManager] = useState(() => new TextTessellationManager());

  useEffect(() => {
    textManager.initialize(text, size);
  }, [text, size, textManager]);

  useFrame((state) => {
    textManager.update(state.clock);
  });

  return textManager.mesh ? <primitive object={textManager.mesh} {...props} /> : null;
}
