package main

import (
	"context"
	"fmt"
	"log"

	"github.com/google/uuid"
	"github.com/segmentio/kafka-go"
)

func main() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     []string{"my-cluster-kafka-bootstrap:9091", "my-cluster-kafka-bootstrap:9092", "my-cluster-kafka-bootstrap:9093"},
		GroupID:     uuid.New().String(),
		Topic:       "so1-proyecto2",
		MinBytes:    10e3, // 10KB
		MaxBytes:    10e6, // 10MB
		StartOffset: kafka.LastOffset,
	})

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			log.Fatal("failed to read message:", err)
			break
		}
		fmt.Printf("message at topic/partition/offset %v/%v/%v: %s = %s\n", m.Topic, m.Partition, m.Offset, string(m.Key), string(m.Value))
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close reader:", err)
	}
}
