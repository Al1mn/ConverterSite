import { useEffect, useRef } from "react";

const TARGET_WIDTH = 100;

export function useFrameProcessor(videoRef, wsRef, onDimensionsCalculated) {
    const canvasRef = useRef(document.createElement("canvas"));

    useEffect(() => {
        let animationFrameId;
        let lastSendTime = 0;
        const fpsInterval = 1000 / 24;

        const processFrame = (timestamp) => {
            animationFrameId = requestAnimationFrame(processFrame);

            if (timestamp - lastSendTime < fpsInterval) return;

            const video = videoRef.current;
            const ws = wsRef.current;

            if (
                !video ||
                video.readyState !== video.HAVE_ENOUGH_DATA ||
                !ws ||
                ws.readyState !== WebSocket.OPEN
            ) {
                return;
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });

            const aspect = video.videoHeight / video.videoWidth;
            const targetHeight = Math.floor(TARGET_WIDTH * aspect * 0.55);

            if (canvas.width !== TARGET_WIDTH || canvas.height !== targetHeight) {
                canvas.width = TARGET_WIDTH;
                canvas.height = targetHeight;
                if (onDimensionsCalculated) {
                    onDimensionsCalculated(TARGET_WIDTH, targetHeight);
                }
            }

            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
            ctx.restore();

            canvas.toBlob(
                (blob) => {
                    if (blob && ws.readyState === WebSocket.OPEN) {
                        blob.arrayBuffer().then((buffer) => ws.send(buffer));
                    }
                },
                "image/jpeg",
                0.4
            );

            lastSendTime = timestamp;
        };

        animationFrameId = requestAnimationFrame(processFrame);

        return () => cancelAnimationFrame(animationFrameId);
    }, [videoRef, wsRef, onDimensionsCalculated]);
}