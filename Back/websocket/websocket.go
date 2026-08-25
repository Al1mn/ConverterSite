package websocket

import (
	"log"
	"net/http"

	"github.com/Al1mn/ConverterSite.git/imageio"
	"github.com/Al1mn/ConverterSite.git/processing"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024 * 64,
	WriteBufferSize: 1024 * 64,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket Upgrade Error: %v\n", err)
		return
	}
	defer conn.Close()

	log.Println("Client connected")

	for {
		messageType, payload, err := conn.ReadMessage()
		if err != nil {
			log.Printf("Client disconnected: %v\n", err)
			break
		}

		if messageType == websocket.BinaryMessage {
			img, err := imageio.LoadImage(payload)
			if err != nil {
				continue
			}

			grayImg := processing.ToLuma(img)

			asciiArt := processing.ConvertToASCII(grayImg, img, false)

			if err := conn.WriteMessage(websocket.TextMessage, []byte(asciiArt)); err != nil {
				log.Printf("Write error: %v\n", err)
				break
			}
		}
	}
}
