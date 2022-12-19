
import { useEffect, useRef, useMemo, useState } from 'react';
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

export function MemoryCardGame({numberRows = 3, numberCols = 3}) {

    // const texture = useTexture([dataGame.defaultImage])
    const [defaultTexture, ...textures] = useTexture([dataGame.defaultImage, ...dataGame.images]);

    const positionsCards = useMemo(()=>{
        const res = [];
            for(let i = 0; i < numberRows; i++) {
                for(let j = 0; j < numberCols; j++) {
                    const position = [i,j,0];
                    res.push(position);
                }
            }
        return res;
    },[numberRows, numberCols])


    const cardsRef = useRef();
    const [gameManager, setGameManager] = useState(null);
    useEffect(()=>{
        if(cardsRef.current && gameManager === null) {
            setGameManager((v)=>new GameManager(cardsRef.current));
        }
    },[cardsRef])

    return (
        <>
        <group ref={cardsRef} name='cards' scale={[50,50,50]}>
            {positionsCards.map((position, i) => (
                <>
                    <Card name={`card-${i}-0`} position={[positionsCards[i][0],positionsCards[i][1],positionsCards[i][2]]} defaultTexture={defaultTexture} texture={textures[i % textures.length]} scale={[1,1,1]} />
                    {/* <Card name={`card-${i}-1`} position={[positionsCards[i+1][0],positionsCards[i+1][1],positionsCards[i+1][2]]} defaultTexture={defaultTexture} texture={textures[i % textures.length]} scale={[1,1,1]} /> */}
                </>
            ))}
        </group>
        </>
    );
    // return <Card defaultTexture={defaultTexture} texture={textures[0]} name="card-1" scale={[50,50,50]} />;    
}

export class GameManager {
    constructor(cards) {
        this.cards = cards;
        // console.log(cards);
    }
}


export function Card({defaultTexture, texture, ...props}) {

    const meshRef = useRef();

    useEffect(()=>{
        const meshCurrent = meshRef.current;
        if(meshCurrent && !meshCurrent.userData.isLoaded) {
            // LOAD userData game to mesh
            meshCurrent.userData.isLoaded = true;
            meshCurrent.userData.showCard = false; // Cuando es true mostramos la imagen a memorizar y cuando es false mostramos la imagen por defecto de todas
            meshCurrent.userData.isClickEnabled = true;
            meshCurrent.userData.startAnimationFlipCardToTexture = () => {
                startTweenAnimationFlipCard(meshCurrent,texture);
            }
            meshCurrent.userData.startAnimationFlipCardToDefaultTexture = () => {
                startTweenAnimationFlipCard(meshCurrent,defaultTexture);
            }
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
            meshCurrent.userData.startAnimationFlipCardToTexture();
            // startTweenAnimationFlipCard(meshCurrent, texture);
            // meshCurrent.material.map = texture;
            // meshCurrent.material.needsUpdate = true;

        } else {
            // SAVE FLIP CARD
            meshCurrent.userData.showCard = !meshCurrent.userData.showCard
            // Mostramos la default texture con animacion
            meshCurrent.userData.startAnimationFlipCardToDefaultTexture();
            // startTweenAnimationFlipCard(meshCurrent, defaultTexture);
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
                                z: 0 + 3,
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
                                y: 0 + 10,
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