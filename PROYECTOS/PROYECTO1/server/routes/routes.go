package routes

import (
	controllers "server/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/monitoring", controllers.Monitoring())
}
