package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Crea un grupo de rutas para /api
	api := app.Group("/api")

	api.Get("/monitoring/live", controllers.LiveMonitoring())
	api.Get("/monitoring/history", controllers.HistoryMonitoring())
	api.Get("/processes", controllers.ProcessTree())
	api.Get("/simulate/:state", controllers.SimulateStates())
}
