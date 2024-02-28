package main

import (
	routes "server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Crea una nueva instancia de Fiber
	app := fiber.New()

	// Configura el CORS una vez
	app.Use(cors.New())

	// Configura tus rutas
	routes.SetupRoutes(app)

	// Escucha en el puerto 3000
	app.Listen(":3000")
}
