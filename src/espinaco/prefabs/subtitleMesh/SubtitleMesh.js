import React from 'react';
import { Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import useVideo from '../../hooks/useVideo';


export function SubtitleMesh({ nameFileSubtitle = "HOKE-MOONDIAL.srt" }) {

    const video = useVideo();

    const [subtitles, setSubtitles] = useState();

    const [subtitleText, setSubtitleText] = useState();

    useEffect(() => {

        fetch('/subtitles/' + nameFileSubtitle)
            .then((r) => r.text())
            .then(text => {
                const subtitles = getSubtitlesFromSrtText(text);
                setSubtitles(subtitles);
            });

    }, [])

    useFrame(()=>{
        if(
            video && video.currentTime && 
            subtitles
            ) {
            // setSubtitleText(video.currentTime)
            const text = extractSubtitleText(video.currentTime,subtitles);
            setSubtitleText(text)
        }
    })

    return (
        <>
            <Text3DMesh text={subtitleText}  />
        </>
    );
}

function extractSubtitleText(videoCurrentTime, subtitles) {
    let result;
    let subtitle;
    let startTime = 0;
    let endTime = 0;
    for(let i = 0; i < subtitles.length -1; i++) {
        subtitle = subtitles[i];
        startTime = subtitle.startTime;
        endTime = subtitle.endTime;
        // console.log(startTime)
        // console.log(videoCurrentTime)
        if(videoCurrentTime >= startTime && videoCurrentTime <= endTime){
            result = subtitle.subtitleText;
        }
    }
    // console.log(result)
    return result;
}

function Text3DMesh({text="Cubo"}) {
    return (
        <>
            <Text3D position={[-20,0,-20]} scale={[5,5,5]} font={'/fonts/helvetiker_regular.typeface.json'} bevelEnabled bevelSize={0.05}>
                {text}
            </Text3D>
        </>
    );
}

function getSubtitlesFromSrtText(text) {
    // console.log(text);
    const textSplitted = text.split(/\r?\n/);
    const textFilter = textSplitted.filter(n => n) // Eliminamos los elementos vacios
    const subtitles = [];
    for(let i = 0; i < textFilter.length ; i += 3) {
        const subtitle = new Subtitle(
            textFilter[i],
            extractStartTime(textFilter[i+1]),
            extractEndTime(textFilter[i+1]),
            textFilter[i+2]
            )
        subtitles.push(subtitle);
    }
    // console.log(textFilter)
    // console.log(subtitles)
    return subtitles;
}

function extractStartTime(text) {
    const textFilter1 = text.split("-->")[0].trim();
    const textFilter2 = textFilter1.split(":");
    let hours = parseInt(textFilter2[0]);
    let minutes = parseInt(textFilter2[1]);
    let seconds = parseFloat(textFilter2[2].replace(",","."));
    let result = seconds;
    for(let i = 0; i < hours ; i++) {
        minutes += 60.0;
    }
    for(let i = 0; i < minutes ; i++) {
        result += 60.0;
    }
    return result;
}

function extractEndTime(text) {
    const textFilter1 = text.split("-->")[1].trim();
    const textFilter2 = textFilter1.split(":");
    let hours = parseInt(textFilter2[0]);
    let minutes = parseInt(textFilter2[1]);
    let seconds = parseFloat(textFilter2[2].replace(",","."));
    let result = seconds;
    for(let i = 0; i < hours ; i++) {
        minutes += 60.0;
    }
    for(let i = 0; i < minutes ; i++) {
        result += 60.0;
    }
    return result;
}


class Subtitle {

    constructor(pos, startTime, endTime, subtitleText) {
        this.pos = pos;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subtitleText = subtitleText;
    }
}