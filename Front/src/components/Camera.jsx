import { useEffect, useRef } from "react";

function Camera() {
    const videoRef = useRef(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false,
                    });

                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Camera error:", error);
            }
        }

        startCamera();
    }, []);

    return (
        <video
            ref={videoRef}
            playsInline
            style={{
                transform: "scaleX(-1)"
            }}
        />
    );
}

export default Camera;