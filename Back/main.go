package main

import (
	"log"
	"net/http"

	"github.com/Al1mn/ConverterSite.git/websocket"
)

func main() {
	http.HandleFunc("/ws", websocket.HandleWS)

	port := ":8080"
	log.Printf("Server running on ws://localhost%s/ws\n", port)

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed to start: %v\n", err)
	}
}
