import WaveformPlaylist from "waveform-playlist";
import React, { Component } from 'react';
import { throwStatement } from "@babel/types";



class WaveformWithAnnotations extends Component {
    state = {}
    player = undefined

    componentDidMount() {
        console.log("WaveformWithAnnotations: mount", this);
        this.load(true)
    }

    componentDidUpdate(prevProps) {
        if (!this.player) return // if no player, meaning that mounting is not successfully done
        const currentProps = this.props
        if ((prevProps.notes !== currentProps.notes) || (prevProps.actions !== currentProps.actions)) {
            console.log("recreating player again....", prevProps, currentProps);
            this.clearPlayer()
            this.load(true)
        } else if (prevProps.scr !== currentProps.src) {
            this.load(false)
        }
    }

    componentWillUnmount() {
        this.player && this.player.clear()
    }

    render() {
        console.log("WaveformWithAnnotations: render");
        return (
            <div id="playlist">
                <ul>
                    <li>{this.player ? this.player.annotationList.annotations[0].lines[0] : "HI"}</li>
                    <li>{this.player ? this.player.annotationList.annotations[1].lines[0] : "HI"}</li>
                    <li>{this.player ? this.player.annotationList.annotations[2].lines[0] : "HI"}</li>
                </ul>
            </div>
        );
    }

    clearPlayer() {
        this.player.clear()
        document.getElementById("playlist").textContent = ''
    }

    load(newPlayer = false) {
        if (newPlayer) {
            console.log("the new notes", this.props.notes);

            this.player = WaveformPlaylist({
                container: document.getElementById("playlist"),
                timescale: true,
                state: 'select',
                samplesPerPixel: 1024,
                colors: {
                    waveOutlineColor: '#E0EFF1',
                    timeColor: 'grey',
                    fadeColor: 'black'
                },
                annotationList: {
                    annotations: this.props.notes,
                    controls: this.props.actions,
                    editable: true,
                    isContinuousPlay: false,
                    linkEndpoints: true
                }
            });
        }
        this.player.load([
            {
                src: this.props.src
            }
        ]).then(function () {
            //can do stuff with the playlist.
            console.log("then in playlist");
        });
    }
    reload2_old() {
        this.player.clear()
        // const ee = this.player.getEventEmitter().__ee__
        console.log("The player", this.player);
        document.pp = this.player
        this.player.load([{
            src: "audio/Vocals30.mp3"
        }]).then(function () {
            //can do stuff with the playlist.
            console.log("then in playlist2");
        });
        // this.player.annotationList.annotations = [this.player.annotationList.annotations[3], this.player.annotationList.annotations[4]]
        const newNote = {
            "begin": "1",
            "children": [],
            "end": "3",
            "id": "f000099",
            "language": "eng",
            "lines": [
                "A new note to be brave."
            ]
        }
        for (let i = 1; i <= this.player.annotationList.annotations.length; i++) {
            const element = this.player.annotationList.annotations[i];

            this.player.annotationList.annotations.splice(i, 1)
            this.player.annotationList.setupInteractions()
            this.player.drawRequest()
        }
        this.player.annotationList.annotations.splice(0, 0, newNote)
        this.player.annotationList.setupInteractions()
        this.player.drawRequest()
        // this.player.annotationList.annotations.splice(0, this.player.annotationList.annotations.length)
        // this.player.annotationList.annotations.push(newNote)
        // this.player.annotationList.setupInteractions()
        // this.player.drawRequest()
    }
}

export default WaveformWithAnnotations;