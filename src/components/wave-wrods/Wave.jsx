import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
// TODO: use the useContext for analayser and audioContext
import { getContext, loadAudioBuffer, splitBuffer, playSource, splitIntoTaps, extractWithBuffers, playAudioBuffer } from './utils';
import {drawFreqBars} from './renderer'

export const Wave = ({
    spaceBetweenBars = 1,
    width=1024,
    height=100,
    tape
    }) => {
    const [progress, setProgress] = useState(0)
    const freqСanvas = useRef(null)
    // const [player, setPlayer] = await usePlayer()
    const [audionState, setAudionState] = useState({
        startedAt: null,
        pausedAt: null,
        isPause: true,
        duration: 0,
    })

    useEffect(() => {
        // re-render the tape
        render()
    }, [tape])

    const render = () => {
        if(!tape) return
        // console.log("rendering2", tape, JSON.parse(JSON.stringify(tape.buffer)));
        window.tt = tape
        if(!tape.buffer) return
        
        const styles = {
            fillStyle: 'rgb(250, 250, 250)', // background
            strokeStyle: 'rgb(251, 89, 17)', // line color
            lineWidth: 1,
            fftSize: 16384, // delization of bars from 1024 to 32768
            spaceBetweenBars: spaceBetweenBars
        }
        const canvas = freqСanvas.current
        console.log("rendering..........", tape);
        drawFreqBars(tape.buffer.getChannelData(0), canvas, styles)
    }
    return (
        // <span>
        //     <button onClick={render}> re-render </button>
        // </span>
        <canvas ref={freqСanvas} width={width} height={height}/>
    );
}
