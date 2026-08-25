import { useState, useEffect, useRef, useCallback } from "react";
import Camera from "./components/Camera.jsx";
import AsciiDisplay from "./components/Terminal.jsx";
import { createWebSocket } from "./connecting/websocket.js";
import { useFrameProcessor } from "./hooks/captureFrame.js";
import "./styles/App.css";

function App() {
    const [asciiText, setAsciiText] = useState("Подключение...");
    const [dimensions, setDimensions] = useState({ width: 100, height: 40 });

    const videoRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        const ws = createWebSocket((data) => setAsciiText(data));
        wsRef.current = ws;

        return () => {
            ws.close();
        };
    }, []);

    const handleDimensions = useCallback((width, height) => {
        setDimensions({ width, height });
    }, []);

    useFrameProcessor(videoRef, wsRef, handleDimensions);

  return (
        <div className="app-container">
            <Camera ref={videoRef} />
            <AsciiDisplay
                asciiText={asciiText}
                targetWidth={dimensions.width}
                targetHeight={dimensions.height}
            />
    </div>
    );
}

export default App;