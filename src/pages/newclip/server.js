import axios from 'axios'

export const synthesizeText = (token, clipId, oldWord, newWord) => {
    return axios.post(`http://localhost:5000/clips/${clipId}/synthesize`, { text: newWord }, { headers: { "x-access-token": token, "Cache-Control": "no-store,no-cache" } })
        .then(res => {
            axios.get(`http://localhost:5000/clips/${clipId}download/synthesized?path=${res.data.uri}`, { responseType: "arraybuffer", headers: { 'x-access-token': utoken } })
                .then(res => res.data)
        })
}


export const mockedAlignments = {
    "words": [
        {
            "id": "ASR0",
            "startText": "one", // the original word text
            "word": "one", // what he say (as outputed from ASR)
            "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
            "start": 0,
            "end": 2.68,
            "confidence": 100, // the confidence or the score of the ASR
            "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
        },
        {
            "id": "ASR1",
            "startText": "From fairest creatures we desire increase,", // the original word text
            "word": "From fairest creatures we desire increase,",
            "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
            "start": 2.680,
            "end": 5.880,
            "confidence": 100,
            "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
        },
        {
            "id": "ASR2",
            "startText": "That thereby beauty's rose might never die,",
            "word": "That thereby beauty's rose might never die,",
            "word-labeled": "1", // applying labeling.. may be the user apply it by hand but he don't want to change the wav itself
            "start": 5.880,
            "end": 9.240,
            "confidence": 100,
            "style": "should be one of defined styles like 'edited', 'normal' or 'error', 'removed'"
        }
    ]
}