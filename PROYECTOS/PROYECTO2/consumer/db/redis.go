package db

import (
	"log"

	models "consumer/models"

	"github.com/go-redis/redis"
)

func InsertRedis(data models.Vote) {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis-service:6379", // Actualiza con tu dirección y puerto
		Password: "",                   // No password set
		DB:       0,                    // use default DB
	})

	pong, err := client.Ping().Result()
	if err != nil {
		log.Println(err)
	} else {
		log.Println(pong)
	}

	// Incrementa el conteo del álbum
	err = client.Incr(data.Data.Album).Err()
	if err != nil {
		log.Println(err)
	} else {
		log.Println("Voto registrado para el álbum:", data.Data.Album)
	}
}
