import { useEffect, useRef } from "react";
import { calculateFontSize } from "../utils/resize";

function AsciiDisplay({ asciiText, targetWidth, targetHeight }) {
    const preRef = useRef(null);

    useEffect(() => {
        const updateFontSize = () => {
            if (!preRef.current) return;
            const fontSize = calculateFontSize(
                targetWidth,
                targetHeight,
                window.innerWidth,
                window.innerHeight
            );
            preRef.current.style.fontSize = `${fontSize}px`;
        };

        updateFontSize();
        window.addEventListener("resize", updateFontSize);
        return () => window.removeEventListener("resize", updateFontSize);
    }, [targetWidth, targetHeight]);

    return (
        <pre ref={preRef} className="ascii-output">
            {asciiText}
        </pre>
    );
}

export default AsciiDisplay;