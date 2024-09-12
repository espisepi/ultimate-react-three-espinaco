import React from "react";
import { Fullscreen, Container } from "@react-three/uikit";

export const Scene1UI = React.memo(({}) => {
  return (
    <>
      <Fullscreen flexDirection="column" padding={10} gap={10}>
        <Container
          flexGrow={1}
          backgroundOpacity={0.5}
          hover={{ backgroundOpacity: 1 }}
          backgroundColor="red"
        />
        <Container
          flexGrow={1}
          backgroundOpacity={0.5}
          hover={{ backgroundOpacity: 1 }}
          backgroundColor="blue"
        />
      </Fullscreen>
    </>
  );
});
