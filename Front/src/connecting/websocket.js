export function createWebSocket(onMessage) {
    const ws = new WebSocket("http://localhost:8080/ws");

    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
        if (typeof event.data === "string") {
            onMessage(event.data);
        } else if (event.data instanceof ArrayBuffer) {
            const text = new TextDecoder().decode(event.data);
            onMessage(text);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket closed");
    };

    return ws;
}