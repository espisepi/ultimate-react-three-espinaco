import { useEffect, useState } from "react";

export default function useIframeCanvas(
  iframeId = "iframe-gba",
  canvasId = "emulator_target",
  interval = 100
) {
  // Hacer un setInterval que finaliza hasta que encuentra el canvas
  const [canvas, setCanvas] = useState();
  useEffect(() => {
    const id_interval = setInterval(() => {
      const iframe = document.getElementById(iframeId);
      const canvasEl = iframe.contentWindow.document.getElementById(canvasId);
      if (canvasEl && canvasEl.width !== 0 && canvasEl.height !== 0) {
        setCanvas((v) => canvasEl);
        clearInterval(id_interval);
      }
    }, interval);
  }, [iframeId, canvasId, interval]);
  return canvas;
}
