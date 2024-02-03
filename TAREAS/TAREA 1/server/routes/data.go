package routes

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type Response struct {
	Name   string
	Carnet string
	Date   string
}

func Data() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Obtener la fecha actual
		actualDate := time.Now().Format("2006-01-02 15:04:05")

		// Construir la respuesta
		respuesta := Response{
			Name:   "Kevin Ernesto García Hernández",
			Carnet: "202113553", // Puedes establecer un valor específico para el carne o dejarlo en blanco
			Date:   actualDate,
		}

		// Enviar la respuesta como JSON
		return c.JSON(respuesta)
	}
}
