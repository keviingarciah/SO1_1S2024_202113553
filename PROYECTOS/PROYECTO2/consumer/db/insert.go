package db

import (
	"consumer/models"
	"encoding/json"
	"log"
	"time"
)

func InsertData(event []byte) {
	// Convert the Album to JSON
	var data models.Vote
	err := json.Unmarshal(event, &data)
	if err != nil {
		log.Fatal("failed to unmarshal data:", err)
	}

	log := models.Data{
		Data:         data,
		CreationDate: time.Now().String(),
	}

	InsertMongo(log)
}
