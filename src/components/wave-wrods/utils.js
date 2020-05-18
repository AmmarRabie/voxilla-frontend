import Axios from "axios";
import fs from "fs"
import Ciseaux from 'ciseaux/browser'

class AdvancedTap{
    constructor(tape, buffer) {
      this.tape = tape
      this.buffer = buffer
    }

    play(mixLast = false, start=true) {
        if(this.source && !mixLast){
            try {
                this.source.stop()
                this.source.disconnect()
            } catch (error) {
                
            }
        }
        // create source node every time you want to play
        this.source = Ciseaux.context.createBufferSource()
        this.source.connect(Ciseaux.context.destination)
        this.source.buffer = this.buffer
        
        // start playing from begninning
        start && this.source.start(0, 0); // TODO .then(updatePosition)
        return this.source
    }

    render(){
        return this.tape.render()
    }

    get tape() {
      return this._tape;
    }

    get source() {
      return this._source;
    }
    set source(s) {
      this._source = s;
    }

    set tape(tape) {
      this._tape = tape;
    }
    get buffer() {
        return this._buffer;
    }
    set buffer(buffer) {
        this._buffer = buffer;
    }
    get start() {
        return this._tape.start;
    }
    get end() {
        return this._tape.end;
    }
    get duration() {
        return this._tape.duration;
    }
}

export const getContext = () => {
    const ac = new AudioContext() // TODO: add different browsers
    return ac
}

export const loadAudioBuffer = async (src, context) => {
    const ac = context || getContext()
    const response = await Axios.get(src, {
        responseType: 'arraybuffer',
    });
    const audioBuffer = await ac.decodeAudioData(response.data);
    return audioBuffer
}

export const splitBuffer = (context, bufferAll, alignments) => {
    context = context || getContext()
    alignments = alignments || [
        ["word1.5", 0, 1.5],
        ["word1.5", 1.5, 3],
        ["word3", 3, 6],
        ["word4", 6, 10],
    ]

    const currentSource = context.createBufferSource()
    const copy = (source, destination, start, end) => {
        let j = 0
        for (let i = start; i < end; i++) {
            const element = source[i];
            destination[j++] = element
        }
    }
    const half = context.createBuffer(bufferAll.numberOfChannels, (bufferAll.length / 2), bufferAll.sampleRate)
    for (let i=0; i<bufferAll.numberOfChannels; i++) {
        const channel = half.getChannelData(i);
        channel.set( bufferAll.getChannelData(i).slice(0, bufferAll.getChannelData(i).length / 2), 0);
        // channel.set( buffer2.getChannelData(i), buffer1.length);
    }
    const half2 = context.createBuffer(bufferAll.numberOfChannels, (bufferAll.length / 2), bufferAll.sampleRate)
    for (let i=0; i<bufferAll.numberOfChannels; i++) {
        const channel = half.getChannelData(i);

        // channel.set( bufferAll.getChannelData(i).slice(bufferAll.getChannelData(i).length / 2, bufferAll.getChannelData(i).length / 2 - 45), 0);
        channel.set( bufferAll.getChannelData(i).slice(bufferAll.getChannelData(i).length / 2, bufferAll.getChannelData(i).length / 2), 0);

        // channel.set( buffer2.getChannelData(i), buffer1.length);
    }
    // copy(bufferAll, half, 0, bufferAll.length / 2)
    // currentSource.buffer = new AudioBuffer({
    //     length: bufferAll.length / 2,
    //     numberOfChannels: bufferAll.numberOfChannels,
    //     sampleRate: bufferAll.sampleRate
    // })
    // copy(bufferAll, currentSource.buffer, 0, currentSource.length)
    // currentSource.buffer = withWaveHeader(half2, 2, bufferAll.sampleRate)
    currentSource.buffer = bufferAll
    currentSource.connect(context.destination)
    window.test = half
    window.bufferAll = bufferAll
    return [currentSource]
}


export const splitIntoTaps = (src, alignments) => {
    Ciseaux.context = new AudioContext()
    window.cx = Ciseaux.context
    return Ciseaux.from(src).then((origTap) => {
        console.log("here is the tape", origTap);
        
        // edit tape (test)
        // tape = Ciseaux.concat([ origTap.slice(10, 1), origTap.slice(2, 3) ]).loop(4);

        const tapes = []
        alignments.forEach(word => {
            const {start, end, text} = word // TODO BUG 
            const currentWordTape = origTap.slice(start, end - start)
            // currentWordTape.info = {start, end, duration: end - start}
            tapes.push(new AdvancedTap(currentWordTape))
        });
        console.log("return taps from promise split: ", tapes);
        window.tapes = [{...tapes[0], ...tapes[0].info }, {...tapes[1]}]
        // test: play first one
        // tapes[0].render().then((audioBuffer) => {
        //     console.log("here is the bufffer", audioBuffer);
        //     playAudioBuffer(Ciseaux.context, audioBuffer)
        //   })
        // render the tape to an AudioBuffer
        return tapes;
      })/*.then((audioBuffer) => {
        console.log("here is the bufffer", audioBuffer);
        playAudioBuffer(Ciseaux.context, audioBuffer)
      });*/
}

// export const extractWithBuffers = async (src, alignments) => {
//     const res = []
//     const tapes = await splitIntoTaps(src, alignments)
//     for (let i = 0; i < tapes.length; i++) {
//         const tape = tapes[i]
//         const buffer = await tape.render()
//         const copy = {...tape}
//         copy.info.buffer = buffer
//         // console.log("buffer ", i, copy);
//         setTapeActions(copy)
//         res.push(copy)
//     }
//     const res2 = res
//     // for (let i = 0; i < tapes.length; i++) {
//     //     const tape = tapes[i]
//     //     const buffer = await tape.render()
//     //     tape.info.buffer = buffer
//     //     setTapeActions(tape)
//     // }
//     // console.log("tapes in extrachwith buffers", res);
//     // return tapes
    
//     console.log("res in extrachwith buffers", JSON.parse(JSON.stringify(res)));
//     return res
// }

export const extractWithBuffers = (src, alignments) => {
    const handleTape = (tape) => {
        return tape.render().then((audioBuffer) => {
            // console.log("in the handle tape.render promise before setting", JSON.parse(JSON.stringify(audioBuffer)));
            tape.buffer = audioBuffer
            // console.log("in the handle tape.render promise", JSON.parse(JSON.stringify(tape.buffer)));
            // playAudioBuffer(Ciseaux.context, audioBuffer)
            return tape
        })
    }
    // const handleTape = async (tape) => {
    //     const buffer = await tape.render()
    //     tape.info.buffer = buffer
    //     setTapeActions(tape)
    //     console.log("in hte handle tape", JSON.parse(JSON.stringify(tape)));
        
    //     return tape
    // }
    return splitIntoTaps(src, alignments).then((tapes) => {
        console.log("recieved tapes from promises in split into taps", JSON.parse(JSON.stringify(tapes)));
        // const newTap = handleTape(tapes[0])
        // console.log("new tap", JSON.parse(JSON.stringify(newTap.tape)));
        // return handleTape(tapes[0])
        const promises = tapes.map(handleTape)
        return Promise.all(promises)
    })
}

export const setTapeActions = (tape) => {
    tape.actions = {
        play: (mixLast = false) => {
            if(tape.info.source && !mixLast){
                tape.info.source.stop()
            }
            // create source node every time you want to play
            const source = Ciseaux.context.createBufferSource()
            source.connect(Ciseaux.context.destination)
            source.buffer = tape.info.buffer
            tape.info.source = source
            
            // start playing from begninning
            source.start(0, 0);
            return source
        }
    }
    return tape
}

const concat = (buffer1, buffer2) => {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  
    return tmp.buffer;
};

const withWaveHeader = (data, numberOfChannels, sampleRate) => {
    const header = new ArrayBuffer(44);
  
    const d = new DataView(header);
  
    d.setUint8(0, "R".charCodeAt(0));
    d.setUint8(1, "I".charCodeAt(0));
    d.setUint8(2, "F".charCodeAt(0));
    d.setUint8(3, "F".charCodeAt(0));
  
    d.setUint32(4, data.byteLength / 2 + 44, true);
  
    d.setUint8(8, "W".charCodeAt(0));
    d.setUint8(9, "A".charCodeAt(0));
    d.setUint8(10, "V".charCodeAt(0));
    d.setUint8(11, "E".charCodeAt(0));
    d.setUint8(12, "f".charCodeAt(0));
    d.setUint8(13, "m".charCodeAt(0));
    d.setUint8(14, "t".charCodeAt(0));
    d.setUint8(15, " ".charCodeAt(0));
  
    d.setUint32(16, 16, true);
    d.setUint16(20, 1, true);
    d.setUint16(22, numberOfChannels, true);
    d.setUint32(24, sampleRate, true);
    d.setUint32(28, sampleRate * 1 * 2);
    d.setUint16(32, numberOfChannels * 2);
    d.setUint16(34, 16, true);
  
    d.setUint8(36, "d".charCodeAt(0));
    d.setUint8(37, "a".charCodeAt(0));
    d.setUint8(38, "t".charCodeAt(0));
    d.setUint8(39, "a".charCodeAt(0));
    d.setUint32(40, data.byteLength, true);
  
    return concat(header, data);
};
export const playSource = (context, source) => {
    // TODO: add rendernig here or split the rendering alone yaret
    context = context || getContext()
    // source.connect(context.destination);
    source.start(0, 0);
}

export const playTapesInSeries = (tapes, onallend) => {
    const sources = tapes.map((tape) => tape.play(false, false))
    for (let i = 0; i < sources.length - 1; i++) {
        const source = sources[i];
        source.onended = () => {sources[i+1].start(0, 0); source.onended = null}
    }
    sources[0].start(0, 0)
    sources[sources.length - 1].onended = onallend
    return sources
}

export const stopAllSources = (sources) => {
    sources.forEach(source => {
        try {
            source.onended = null
            source.stop()
        } catch (error) {
            console.log(error);
        }
    });
}

export const playAudioBuffer = (context, buffer) => {
    
    context = context || getContext()
    console.log("function playAudioBuffer", context, buffer);
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    source.start(0, 0);
    window.lastContext = context
    window.lastBuffer = buffer
}