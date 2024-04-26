package db

import (
	"context"
	"log"
	"time"

	models "consumer/models"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Album struct {
	Album  string
	Year   string
	Artist string
	Ranked string
	Date   time.Time
}

func ConnectDB() (*mongo.Client, error) {
	// Establece las opciones del cliente
	clientOptions := options.Client().ApplyURI("mongodb://mongodb-service:27017")

	// Conecta al cliente de MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Comprueba la conexión
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Conectado a MongoDB!")
	return client, nil
}

func InsertAlbum(client *mongo.Client, data models.Data) {
	collection := client.Database("so1_proyecto2").Collection("votes")
	_, err := collection.InsertOne(context.TODO(), data)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Album insertado en mongoDB!")
}

func InsertMongo(data models.Data) {
	client, err := ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	InsertAlbum(client, data)
}
