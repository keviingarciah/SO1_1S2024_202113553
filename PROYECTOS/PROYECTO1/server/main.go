package main

import (
	"server/db"
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	// Conexión a la base de datos
	db.DBConnection()

	// Crea una nueva instancia de Fiber
	app := fiber.New()
	// Configura el CORS una vez
	app.Use(cors.New())

	// Configura tus rutas
	routes.SetupRoutes(app)

	// Escucha en el puerto 3000
	app.Listen(":8080")
}
