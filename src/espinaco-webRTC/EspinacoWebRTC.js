


export class EspinacoWebRTC {

    constructor(videoElem, startElem, stopElem, logElem) {
        this.videoElem = videoElem;
        this.logElem = logElem;
        this.startElem = startElem;
        this.stopElem = stopElem;
        this.displayMediaOptions = {
            video: {
            // displaySurface: "window",
            mediaSource: "screen"
            },
            audio: true
        };
        this.setupScreenCapture();
        // this.setupLogging(logElem);
    }

    setupScreenCapture() {
        const startElem = this.startElem;
        const stopElem = this.stopElem;
        // Options for getDisplayMedia()

        

        const self = this;
        
        // Set event listeners for the start and stop buttons
        startElem.addEventListener("click", (evt) => {
            self.startCapture();
        }, false);
        
        stopElem.addEventListener("click", (evt) => {
            self.stopCapture();
        }, false);
  

    }

    async startCapture() {
        const videoElem = this.videoElem;
        const logElem = this.logElem;
        const displayMediaOptions = this.displayMediaOptions;
        logElem.innerHTML = "";
      
        try {
          videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        //   this.dumpOptionsInfo();
        } catch (err) {
          console.error(`Error: ${err}`);
        }
    }

    stopCapture(evt) {
        const videoElem = this.videoElem;
        let tracks = videoElem.srcObject.getTracks();
      
        tracks.forEach((track) => track.stop());
        videoElem.srcObject = null;
      }

    setupLogging(logElem) {
        console.log = (msg) => logElem.innerHTML += `${msg}<br>`;
        console.error = (msg) => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
        console.warn = (msg) => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
        console.info = (msg) => logElem.innerHTML += `<span class="info">${msg}</span><br>`;
    }

    dumpOptionsInfo() {
        const videoElem = this.videoElem;
        const videoTrack = videoElem.srcObject.getVideoTracks()[0];
      
        console.info("Track settings:");
        console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
        console.info("Track constraints:");
        console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
      }
    
}