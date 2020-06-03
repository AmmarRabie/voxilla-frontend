import { Breadcrumb } from 'antd';
import { WaveWords } from 'components/wave-wrods';
import React, { Component } from 'react';


const mockedAlignments = {
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

class NewClipPage extends Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item key="clips">My Clips</Breadcrumb.Item>
                    <Breadcrumb.Item key="cid">Clip Id</Breadcrumb.Item>
                </Breadcrumb>
                <WaveWords src="audio/sonnet.mp3" alignments={mockedAlignments} />
            </div>
        );
    }
}

export default NewClipPage;