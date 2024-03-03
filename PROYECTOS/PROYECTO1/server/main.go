package main

import (
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	/*
		// Conexión a la base de datos
		db.DBConnection()
		// Migra los modelos a la base de datos
		db.DB.AutoMigrate(models.CPU{}, models.RAM{})
	*/

	// Crea una nueva instancia de Fiber
	app := fiber.New()
	// Configura el CORS una vez
	app.Use(cors.New())

	// Configura tus rutas
	routes.SetupRoutes(app)

	// Escucha en el puerto 3000
	app.Listen(":3000")
}
