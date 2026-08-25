import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const Camera = forwardRef((props, ref) => {
    const videoRef = useRef(null);

    useImperativeHandle(ref, () => videoRef.current);

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: { ideal: 640 }, height: { ideal: 480 } },
                        audio: false,
                    });

                if (videoRef.current) {
                videoRef.current.srcObject = stream;
                }
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
            autoPlay
            style={{
                display: "none",
            }}
        />
    );
});

Camera.displayName = "Camera";
export default Camera;