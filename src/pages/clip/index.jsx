import React, { Component } from 'react';
import { Breadcrumb, PageHeader } from 'antd';
// import { TranscriptEditor } from "@bbc/react-transcript-editor";
// import DEMO_TRANSCRIPT from "./alignments.json";
import Waveform from 'components/wave-with-annotations'


const notes = [
    {
        "begin": "0.000",
        "children": [],
        "end": "2.680",
        "id": "f000001",
        "language": "eng",
        "lines": [
            "1"
        ]
    },
    {
        "begin": "2.680",
        "children": [],
        "end": "5.880",
        "id": "f000002",
        "language": "eng",
        "lines": [
            "From fairest creatures we desire increase, kanskd",
            "Line 2 askn dkasndj ns",
            "Line 3 askn dkasndj ns",
            "Line 4 askn dkasndj ns",
        ]
    },
    {
        "begin": "5.880",
        "children": [],
        "end": "9.240",
        "id": "f000003",
        "language": "eng",
        "lines": [
            "That thereby beauty's rose might never die,"
        ]
    },
    {
        "begin": "9.240",
        "children": [],
        "end": "11.920",
        "id": "f000004",
        "language": "eng",
        "lines": [
            "But as the riper should by time decease,"
        ]
    },
    {
        "begin": "11.920",
        "children": [],
        "end": "15.280",
        "id": "f000005",
        "language": "eng",
        "lines": [
            "His tender heir might bear his memory:"
        ]
    },
    {
        "begin": "15.280",
        "children": [],
        "end": "18.600",
        "id": "f000006",
        "language": "eng",
        "lines": [
            "But thou contracted to thine own bright eyes,"
        ]
    },
    {
        "begin": "18.600",
        "children": [],
        "end": "22.800",
        "id": "f000007",
        "language": "eng",
        "lines": [
            "Feed'st thy light's flame with self-substantial fuel,"
        ]
    },
    {
        "begin": "22.800",
        "children": [],
        "end": "25.680",
        "id": "f000008",
        "language": "eng",
        "lines": [
            "Making a famine where abundance lies,"
        ]
    },
    {
        "begin": "25.680",
        "children": [],
        "end": "31.240",
        "id": "f000009",
        "language": "eng",
        "lines": [
            "Thy self thy foe, to thy sweet self too cruel:"
        ]
    },
    {
        "begin": "31.240",
        "children": [],
        "end": "34.280",
        "id": "f000010",
        "language": "eng",
        "lines": [
            "Thou that art now the world's fresh ornament,"
        ]
    },
    {
        "begin": "34.280",
        "children": [],
        "end": "36.960",
        "id": "f000011",
        "language": "eng",
        "lines": [
            "And only herald to the gaudy spring,"
        ]
    },
    {
        "begin": "36.960",
        "children": [],
        "end": "40.680",
        "id": "f000012",
        "language": "eng",
        "lines": [
            "Within thine own bud buriest thy content,"
        ]
    },
    {
        "begin": "40.680",
        "children": [],
        "end": "44.560",
        "id": "f000013",
        "language": "eng",
        "lines": [
            "And tender churl mak'st waste in niggarding:"
        ]
    },
    {
        "begin": "44.560",
        "children": [],
        "end": "48.080",
        "id": "f000014",
        "language": "eng",
        "lines": [
            "Pity the world, or else this glutton be,"
        ]
    },
    {
        "begin": "48.080",
        "children": [],
        "end": "53.240",
        "id": "f000015",
        "language": "eng",
        "lines": [
            "To eat the world's due, by the grave and thee."
        ]
    }
];
const notes2 = [
    {
        "begin": "0.000",
        "children": [],
        "end": "2.680",
        "id": "f000001",
        "language": "eng",
        "lines": [
            "1"
        ]
    },
    {
        "begin": "2.680",
        "children": [],
        "end": "5.880",
        "id": "f000002",
        "language": "eng",
        "lines": [
            "From fairest creatures we desire increase, kanskd",
            "Line 2 askn dkasndj ns",
            "Line 3 askn dkasndj ns",
            "Line 4 askn dkasndj ns",
        ]
    },
    {
        "begin": "5.880",
        "children": [],
        "end": "9.240",
        "id": "f000003",
        "language": "eng",
        "lines": [
            "That thereby beauty's rose might never die,"
        ]
    },
    {
        "begin": "9.240",
        "children": [],
        "end": "11.920",
        "id": "f000004",
        "language": "eng",
        "lines": [
            "But as the riper should by time decease,"
        ]
    }
];


const actions = [
    {
        class: 'fa.fa-minus',
        title: 'Reduce annotation end by 0.010s',
        action: (annotation, i, annotations, opts) => {
            var next;
            var delta = 0.010;
            annotation.end -= delta;

            if (opts.linkEndpoints) {
                next = annotations[i + 1];
                next && (next.start -= delta);
            }
        }
    },
    {
        class: 'fa.fa-plus',
        title: 'Increase annotation end by 0.010s',
        action: (annotation, i, annotations, opts) => {
            var next;
            var delta = 0.010;
            annotation.end += delta;

            if (opts.linkEndpoints) {
                next = annotations[i + 1];
                next && (next.start += delta);
            }
        }
    },
    {
        class: 'fa.fa-scissors',
        title: 'Split annotation in half',
        action: (annotation, i, annotations) => {
            const halfDuration = (annotation.end - annotation.start) / 2;

            annotations.splice(i + 1, 0, {
                id: 'test',
                start: annotation.end - halfDuration,
                end: annotation.end,
                lines: ['----'],
                lang: 'en',
            });

            annotation.end = annotation.start + halfDuration;
        }
    },
    {
        class: 'fa.fa-trash',
        title: 'Delete annotation',
        action: (annotation, i, annotations) => {
            annotations.splice(i, 1);
        }
    }
];

class ClipPage extends Component {
    state = {
        notes: notes
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ notes: notes2 })
            console.log("State will updated soon");

        }, 5000);
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>My Clips</Breadcrumb.Item>
                    <Breadcrumb.Item>Clip Id</Breadcrumb.Item>
                </Breadcrumb>
                <PageHeader >My clip Name 1</PageHeader>
                <Waveform notes={this.state.notes} actions={actions} src={"audio/sonnet.mp3"} />
                {/* <TranscriptEditor transcriptData={DEMO_TRANSCRIPT}
                    mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
                    mediaType={'video'}
                    sttJsonType={"bbckaldi"}
                /> */}

            </div>
        );
    }
}

export default ClipPage;