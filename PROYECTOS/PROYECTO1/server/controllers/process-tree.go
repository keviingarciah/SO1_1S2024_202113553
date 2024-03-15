package controllers

import (
	"encoding/json"
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func ProcessTree() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Obtiene la información de los procesos
		procs, err := GetProcesses()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		// Deserializa el JSON a un objeto Go
		var result map[string]interface{}
		err = json.Unmarshal([]byte(procs), &result)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error al deserializar el JSON de los procesos",
			})
		}

		// Devuelve el objeto Go como un objeto JSON
		return c.JSON(result)
	}
}

func GetProcesses() (string, error) {
	out, err := exec.Command("sh", "-c", "cat /proc/proc_so1_1s2024").Output()
	if err != nil {
		return "", err
	}
	jsonStr := strings.TrimSuffix(string(out), "\n")
	return jsonStr, nil
}
