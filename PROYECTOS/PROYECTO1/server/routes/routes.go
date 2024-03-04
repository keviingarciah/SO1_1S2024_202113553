package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/monitoring/live", controllers.LiveMonitoring())
	app.Get("/monitoring/history", controllers.HistoryMonitoring())
}
