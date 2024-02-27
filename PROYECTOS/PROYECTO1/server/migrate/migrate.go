package main

import (
	"server/db"
	"server/models"
)

func init() {
	db.ConnectToDB()
}

func main() {
	db.DB.AutoMigrate(&models.Person{})
}
