package db

import (
	"log"
	"server/config"
	"server/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBConnection() *gorm.DB {
	var err error

	dsn := config.GetDSN()
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect DB")
	}

	// Migra los modelos a la base de datos
	DB.AutoMigrate(models.CPU{}, models.RAM{})

	return DB
}
