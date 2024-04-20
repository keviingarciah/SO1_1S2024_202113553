package main

import (
	routes "server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Crea una nueva instancia de Fiber
	app := fiber.New()

	// Configura el CORS
	app.Use(cors.New())

	// Configura tus rutas
	app.Get("/data", routes.Data())

	// Escucha en el puerto 5000
	app.Listen(":5000")
}
