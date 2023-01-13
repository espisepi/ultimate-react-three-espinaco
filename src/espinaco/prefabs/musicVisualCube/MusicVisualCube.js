
import React from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import { Box, useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MusicVisualCubeClass } from './MusicVisualCubeClass'


export function MusicVisualCubeReact() {

    // const [
    //     diffuseMap,
    //     normalMap,
    //     roughness,
    //     metalness
    // ] = useLoader(TextureLoader, [
    //     'resources/background-grey-dots.png',
    //     'resources/freepbr/flaking-plaster_normal-ogl.png',
    //     'resources/freepbr/flaking-plaster_roughness.png',
    //     'resources/freepbr/flaking-plaster_metallic.png'
    // ])

    const leePerryMesh = useGLTF("models/LeePerrySmith.glb");

    const { scene, three } = useThree();
    const [musicVisualCube, setMusicVisualCube] = useState();

    useEffect(() => {
        console.log(scene)
        // AQUI COMIENZA ==================================
        const mesh1 = leePerryMesh.scene.children[0]
        const musicVisualCubeClass = new MusicVisualCubeClass(scene,mesh1);
        setMusicVisualCube(musicVisualCubeClass);
        // AQUI TERMINA ===================================
    }, [])

    useFrame((state, delta)=>{
        if(musicVisualCube) {
            musicVisualCube.update()
        }
    })

    return (
        <>
            <Box material-color="red" material-wireframe={true}/>
        </>
    )
}


const FS_DECLARATIONS = `

uniform sampler2D audioDataTexture;
uniform vec2 iResolution;
uniform float iTime;

#define M_PI 3.14159
#define NUM_BARS 64.0
#define CIRCLE_RADIUS 0.15
#define BAR_HEIGHT 0.125


// All code snippets taken from Inigo Quilez's site
// Make sure to check out his site!
// https://iquilezles.org/
//
vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

float dot2(in vec2 v ) { return dot(v,v); }

float sdfTrapezoid(in vec2 p, in float r1, float r2, float he) {
  vec2 k1 = vec2(r2,he);
  vec2 k2 = vec2(r2-r1,2.0*he);
  p.x = abs(p.x);
  vec2 ca = vec2(p.x-min(p.x,(p.y<0.0)?r1:r2), abs(p.y)-he);
  vec2 cb = p - k1 + k2*clamp( dot(k1-p,k2)/dot2(k2), 0.0, 1.0 );
  float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
  return s*sqrt( min(dot2(ca),dot2(cb)) );
}

float sdUnevenCapsule( vec2 p, float r1, float r2, float h ) {
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

float sdTriangleIsosceles( in vec2 p, in vec2 q ) {
    p.x = abs(p.x);
    vec2 a = p - q*clamp( dot(p,q)/dot(q,q), 0.0, 1.0 );
    vec2 b = p - q*vec2( clamp( p.x/q.x, 0.0, 1.0 ), 1.0 );
    float s = -sign( q.y );
    vec2 d = min( vec2( dot(a,a), s*(p.x*q.y-p.y*q.x) ),
                  vec2( dot(b,b), s*(p.y-q.y)  ));
    return -sqrt(d.x)*sign(d.y);
}

float opSmoothUnion( float d1, float d2, float k ) {
  float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
  return mix( d2, d1, h ) - k*h*(1.0-h);
}

float opUnion( float d1, float d2 ) { return min(d1,d2); }
float opIntersection( float d1, float d2 ) { return max(d1,d2); }
float opSubtraction( float d1, float d2 ) { return max(-d1,d2); }

float sdfBar(vec2 position, vec2 dimensions, vec2 uv, float frequencySample) {
  float w = mix(dimensions.x * 0.5, dimensions.x, smoothstep(0.0, 1.0, frequencySample));
  vec2 basePosition = uv - position + vec2(0.0, -dimensions.y * 0.5 - frequencySample * 0.05);

  float d = sdfTrapezoid(
      basePosition,
      dimensions.x * 0.5,
      w, dimensions.y * 0.5);

  return (d > 0.0 ? 0.0 : 1.0);
}

vec2 rotate2D(vec2 pt, float a) {
	float c = cos(a);
  float s = sin(a);

  mat2 r = mat2(c, s, -s, c);

  return r * pt;
}

vec4 DrawBars(vec2 center, vec2 uv) {
  float barWidth = 2.0 * M_PI * CIRCLE_RADIUS / (NUM_BARS * 1.25);

  vec4 resultColour = vec4(1.0, 1.0, 1.0, 0.0);
  vec2 position = vec2(center.x, center.y + CIRCLE_RADIUS);

  for(int i = 0; i < int(NUM_BARS); i++) {
    float frequencyUV = 0.0;
    
    if (float(i) >= NUM_BARS * 0.5) {
      frequencyUV = 1.0 - ((float(i) - (NUM_BARS * 0.5)) / (NUM_BARS * 0.5));
    } else {
      frequencyUV = float(i) / (NUM_BARS * 0.5);
    }

    float frequencyData = texture(audioDataTexture, vec2(frequencyUV, 0.0)).x;

    float barFinalHeight = BAR_HEIGHT * (0.1 + 0.9 * frequencyData);
    vec2 barDimensions = vec2(barWidth, barFinalHeight);
    vec2 barUvs = rotate2D(uv - center, (2.0 * M_PI * float(i)) / NUM_BARS) + center;

    resultColour.w += sdfBar(position, barDimensions, barUvs, frequencyData);
  }

  float d = saturate(1.1 * ((distance(uv, center) - CIRCLE_RADIUS) / BAR_HEIGHT));
  d = smoothstep(0.0, 1.0, d);
  d = 0.45 + 0.55 * d;
  resultColour.xyz *= pal(d, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.20,0.30) );
  resultColour.xyz *= resultColour.w;

  return saturate(resultColour);
}


vec4 AudioVisualizer() {
  float aspect = iResolution.x / iResolution.y;
  vec2 uv = vUv * vec2(aspect, 1.0);

  vec2 circleCenter = vec2(aspect * 0.5, 0.5);

  return DrawBars(circleCenter, uv);
}
`;


function clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
}
