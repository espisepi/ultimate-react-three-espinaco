
import * as THREE from 'three';

export class PointLightMusicClass extends THREE.PointLight {
    
    // analyser: Analyser Class
    constructor(analyser,color = 'red', intensity = 1) {
        super(color, intensity);
        this.analyser = analyser;
    }

    update() {
        this.intensity = 1 * this.analyser.getLowerMax();
    }

    updateAndUpdateAnalyser() {
        this.analyser.update();
        this.update();
    }
}