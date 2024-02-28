package controllers

import (
	"os/exec"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Monitoring() fiber.Handler {
	return func(c *fiber.Ctx) error {
		out, err := exec.Command("cat", "/proc/ram_so1_1s2024").Output()
		if err != nil {
			return c.SendString("Error al obtener el contenido del archivo")
		}
		return c.SendString(strings.TrimSuffix(string(out), "\n"))
	}
}
