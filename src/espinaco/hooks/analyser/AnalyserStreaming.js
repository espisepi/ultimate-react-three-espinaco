import { DataTexture, RedFormat, LuminanceFormat } from "three"; // https://threejs.org/docs/#api/en/constants/Textures

// let context;
// let src;
// let analyser;
// function createMedia(audio) {
//   if (window.contextAnalyser) {
//     context = window.contextAnalyser;
//     src = window.srcAnalyser;
//     analyser = window.analyser;
//   } else {
//     context = new AudioContext();
//     src = context.createMediaElementSource(audio);
//     analyser = context.createAnalyser();
//     src.connect(analyser);
//     analyser.connect(context.destination);

//     window.contextAnalyser = context;
//     window.srcAnalyser = src;
//     window.analyser = analyser;
//   }
// }

// fftSize = 512 || 2048 || potenciaDe2
export default class AnalyserStreaming {
  constructor(video, fftSize = 2048) {
    // Importante hacer en el video que nos llega por parametro lo siguiente
    //     const stream = await navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    //   audio: true,
    // });
    // videoRef.current.srcObject = stream; // videoRef.current : HTMLVideoElement
    this.video = video;
    console.log({ videito: video });
    this.stream = video.srcObject;
    if (!this.stream) {
      console.error(
        "No se ha encontrado el atributo video.srcObject, el video no va a funcionar, que lo sepas"
      );
    }
    this.fftSize = fftSize;
    // if (audio) {
    //   // const context = new AudioContext();
    //   createMedia(audio);
    //   analyser.fftSize = fftSize;
    //   const bufferLength = analyser.frequencyBinCount;
    //   const dataArray = new Uint8Array(bufferLength);
    //   this.fftSize = fftSize;
    //   this.bufferLength = bufferLength;
    //   this.context = context;
    //   this.analyser = analyser;
    //   this.dataArray = dataArray;
    //   this.dataTexture = undefined;
    // } else {
    //   console.error("No se ha podido crear el Analyser");
    // }
    this.init();
    // this.hiddenVideo();
  }

  hiddenVideo() {
    this.video.style.display = "none";
  }

  init() {
    try {
      const [track] = this.stream.getAudioTracks();
      if (track) {
        this.spectrum(new MediaStream([track]));
      } else {
        console.log("No audio track");
      }
    } catch (e) {
      console.log(e);
    }
  }

  spectrum(stream) {
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.audioCtx.createMediaStreamSource(stream).connect(this.analyser);

    // const canvas = div.appendChild(document.createElement("canvas"));
    // canvas.width = window.innerWidth / 2 - 20;
    // canvas.height = window.innerHeight / 2 - 20;
    // const ctx = canvas.getContext("2d");
    this.analyser.fftSize = this.fftSize;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    // ctx.strokeStyle = "rgb(0, 125, 0)";

    //     setInterval(() => {
    //       ctx.fillStyle = "#a0a0a0";
    //       ctx.fillRect(0, 0, canvas.width, canvas.height);

    //       analyser.getByteFrequencyData(data);
    //       ctx.lineWidth = 2;
    //       let x = 0;
    //       for (let d of data) {
    //         const y = canvas.height - ((d / 128) * canvas.height) / 4;
    //         const c = Math.floor((x * 255) / canvas.width);
    //         ctx.fillStyle = `rgb(${c},0,${255 - x})`;
    //         ctx.fillRect(x++, y, 2, canvas.height - y);
    //       }

    //       analyser.getByteTimeDomainData(data);
    //       ctx.lineWidth = 5;
    //       ctx.beginPath();
    //       x = 0;
    //       for (let d of data) {
    //         const y = canvas.height - ((d / 128) * canvas.height) / 2;
    //         x ? ctx.lineTo(x++, y) : ctx.moveTo(x++, y);
    //       }
    //       ctx.stroke();
    //     }, (1000 * canvas.width) / audioCtx.sampleRate);
  }

  disconnect() {
    this.analyser.disconnect();
  }

  getDataTexture() {
    if (!this.dataTexture) {
      const format = RedFormat;
      this.dataTexture = new DataTexture(
        this.dataArray,
        this.bufferLength,
        1,
        format
      );
    }
    return this.dataTexture;
  }

  update() {
    if (this.analyser && this.dataArray)
      this.analyser.getByteFrequencyData(this.dataArray);
  }

  getLowerMax() {
    const lowerHalfArray = this.getLowerHalfArray();
    return Math.max(...this.getLowerHalfArray()) / lowerHalfArray.length;
  }

  getUpdateLowerMax() {
    this.update();
    return this.getLowerMax();
  }

  getLowerHalfArray() {
    const dataArray = this.dataArray;
    if (dataArray) return dataArray.slice(0, dataArray.length / 2 - 1);
    else return [0.0];
  }

  getUpperHalfArray() {
    const dataArray = this.dataArray;
    if (dataArray)
      return dataArray.slice(dataArray.length / 2 - 1, dataArray.length - 1);
    else return [0.0];
  }
}

// Chuletilla===================================
// var lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
// var upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);

// var overallAvg = avg(dataArray);
// var lowerMax = max(lowerHalfArray);
// var lowerAvg = avg(lowerHalfArray);
// var upperMax = max(upperHalfArray);
// var upperAvg = avg(upperHalfArray);

// var lowerMaxFr = lowerMax / lowerHalfArray.length;
// var lowerAvgFr = lowerAvg / lowerHalfArray.length;
// var upperMaxFr = upperMax / upperHalfArray.length;
// var upperAvgFr = upperAvg / upperHalfArray.length;

// makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
// makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));
