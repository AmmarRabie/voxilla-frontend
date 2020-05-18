import React, { useState, useEffect } from 'react';
import './styles.css';
import { extractWithBuffers, playTapesInSeries, stopAllSources } from './utils';
import { Wave } from "./Wave"

export const WaveList = ({ src, alignments }) => {
    const [tapes, setTapes] = useState([])
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [index, setIndex] = useState(0)
    const [audionState, setAudionState] = useState({
        startedAt: null,
        pausedAt: null,
        isPause: true,
        duration: 0,
    })

    useEffect(() => {
        // make sources logic
        const words = {
            "words": [
                {
                    "word": "one", // what he say (as outputed from ASR)
                    "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
                    "start": 0,
                    "end": 2.68,
                    "confidence": 100, // the confidence or the score of the ASR
                    "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
                },
                {
                    "word": "From fairest creatures we desire increase,",
                    "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
                    "start": 2.680,
                    "end": 5.880,
                    "confidence": 100,
                    "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
                },
                {
                    "word": "That thereby beauty's rose might never die,",
                    "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
                    "start": 5.880,
                    "end": 9.240,
                    "confidence": 100,
                    "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
                }
            ]
        }["words"]
        const job = async () => {
            setLoading(true)
            const withBuffers = await extractWithBuffers(src, words)
            setTapes(withBuffers)
            setLoading(false)
        }
        job()

    }, [src])

    let sources = []
    const onClick = () => {
        stopAllSources(sources)
        sources = playTapesInSeries(tapes)
    }

    return (
        <div>
            <button disabled={loading} onClick={onClick}>play</button>
            <div>
                {tapes.map(tape => (
                    <Wave tape={tape} width={512} />
                ))}
            </div>
        </div>
    );
}
