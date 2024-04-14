package db

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBConnection() *gorm.DB {
	var err error

	dsn := GetDSN()
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect DB")
	}

	// Migra los modelos a la base de datos
	DB.AutoMigrate(Vote{})

	return DB
}
