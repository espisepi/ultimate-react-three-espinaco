import { useCallback, useEffect, useRef } from "react";
import * as THREE from 'three';

const DEFAULT_STARS_POINTSIZE = 55;

export function InputRangeStarsPointSize({ showUI = true }) {
  const inputRangeStarsPointSizeRef = useRef(null);
  useEffect(() => {
    if (inputRangeStarsPointSizeRef.current) {
      inputRangeStarsPointSizeRef.current.value = DEFAULT_STARS_POINTSIZE;
    }
  }, [inputRangeStarsPointSizeRef]);
  const handleStarsPointSize = useCallback((value) => {
    if (window.stars) {
      //count, depth, factor, radius, saturation
      const count = 1999;
      const saturation = 1.0;
      const radius = 1000;
      const depth = 400;
      const factor = value || 55;
      const genStar = (r) => {
        return new THREE.Vector3().setFromSpherical(
          new THREE.Spherical(
            r,
            Math.acos(1 - Math.random() * 2),
            Math.random() * 2 * Math.PI
          )
        );
      };

      const [position, color, size] = (() => {
        const positions = [];
        const colors = [];
        const sizes = Array.from(
          { length: count },
          () => (0.5 + 0.5 * Math.random()) * factor
        );
        const color = new THREE.Color();
        let r = radius + depth;
        const increment = depth / count;
        for (let i = 0; i < count; i++) {
          r -= increment * Math.random();
          positions.push(...genStar(r).toArray());
          color.setHSL(i / count, saturation, 0.9);
          colors.push(color.r, color.g, color.b);
        }
        return [
          new Float32Array(positions),
          new Float32Array(colors),
          new Float32Array(sizes),
        ];
      })();

      // Sustituir los valores
      window.stars.geometry.attributes.size.array = size;
      window.stars.geometry.attributes.size.needsUpdate = true;
    }
  }, []);
  return (
    <>
      <div
        id="div-input-range-stars-pointSize"
        className="range"
        style={{
          display: showUI ? "block" : "none",
          position: "absolute",
          left: 30,
          bottom: 130 + 65,
          border: "none",
          borderRadius: "4px",
        }}
      >
        <input
          className="range1"
          type="range"
          ref={inputRangeStarsPointSizeRef}
          onChange={(e) => handleStarsPointSize(e.target.value)}
          min={0.0}
          max={1000.0}
          step={1}
          // value={0.0}
        ></input>
      </div>
    </>
  );
}
