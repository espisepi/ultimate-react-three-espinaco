
import { useEffect, useRef } from 'react';
import { Box, useTexture } from '@react-three/drei';

import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { useFrame } from '@react-three/fiber';

// El codigo esta dentro del <Canvas> de r3f, asi que podemos ejecutar los hooks de r3f like useThree and useFrame

// Tutorial usar TWEEN con threejs
//https://sbcode.net/threejs/tween/
//https://sbcode.net/view_source/tween.html

const BASE_IMG_SRC = 'images/'

const dataGame = {
    defaultImage: BASE_IMG_SRC + 'logo192.png',
    images: [
        BASE_IMG_SRC + 'cardFrontTest.png',
        BASE_IMG_SRC + 'cardFrontTest.png'
    ]
}


export function MemoryCardGame() {

    // const texture = useTexture([dataGame.defaultImage])
    const [defaultTexture, ...textures] = useTexture([dataGame.defaultImage, ...dataGame.images]);

    return <Card defaultTexture={defaultTexture} texture={textures[0]} name="card-1" scale={[50,50,50]} />;    
}


export function Card({defaultTexture, texture, ...props}) {

    const meshRef = useRef();

    useEffect(()=>{
        const meshCurrent = meshRef.current;
        if(meshCurrent && !meshCurrent.userData.isLoaded) {
            console.log(meshCurrent);
            // LOAD userData game to mesh
            meshCurrent.userData.isLoaded = true;
            meshCurrent.userData.showCard = false; // Cuando es true mostramos la imagen a memorizar y cuando es false mostramos la imagen por defecto de todas
            meshCurrent.userData.isClickEnabled = true; 
        }
    },[meshRef])

    const handleClick = () => {
        const meshCurrent = meshRef.current;
        const isClickEnabled = meshCurrent.userData?.isClickEnabled;
        // FLIP CARD
        const showCard = !meshCurrent.userData?.showCard;
        if(meshCurrent && isClickEnabled && showCard ) {
            // SAVE FLIP CARD
            meshCurrent.userData.showCard = !meshCurrent.userData.showCard
            // Mostramos la texture con animacion
            startTweenAnimationFlipCard(meshCurrent, texture);
            // meshCurrent.material.map = texture;
            // meshCurrent.material.needsUpdate = true;

        } else {
            // SAVE FLIP CARD
            meshCurrent.userData.showCard = !meshCurrent.userData.showCard
            // Mostramos la default texture con animacion
            startTweenAnimationFlipCard(meshCurrent, defaultTexture);
            // meshCurrent.material.map = defaultTexture;
            // meshCurrent.material.needsUpdate = true;

        }

    }

    useFrame(()=>{
        TWEEN.update();
    });

    return (
        <Box ref={meshRef} material-map={defaultTexture} {...props} onClick={handleClick}/>
    );
}



function startTweenAnimationFlipCard(mesh, texture) {
    mesh.material.needsUpdate = true;
    new TWEEN.Tween(mesh.position)
                        .to(
                            {
                                z: 0 + 100,
                            },
                            500
                        )
                        .easing(TWEEN.Easing.Cubic.Out)
                        // .onUpdate(() => render())
                        .start()
                        .onComplete(() => {
                            new TWEEN.Tween(mesh.position)
                                .to(
                                    {
                                        z: 0
                                    },
                                    500
                                )
                                .easing(TWEEN.Easing.Bounce.Out)
                                // .onUpdate(() => render())
                                .start()
                        });
    new TWEEN.Tween(mesh.rotation)
                        .to(
                            {
                                y: 0 + 100,
                            },
                            250
                        )
                        .easing(TWEEN.Easing.Cubic.Out)
                        // .onUpdate(() => render())
                        .start()
                        .onComplete(() => {
                            new TWEEN.Tween(mesh.rotation)
                                .to(
                                    {
                                        y: 0,
                                    },
                                    250
                                )
                                .easing(TWEEN.Easing.Bounce.Out)
                                .onUpdate(() => {
                                    // Change texture
                                    mesh.material.map = texture;
                                })
                                .start()
                        });
}