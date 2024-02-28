package controllers

import (
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

func Execute() fiber.Handler {
	return func(c *fiber.Ctx) error {
		cmd := exec.Command("./scripts/ram.sh")

		output, err := cmd.Output()
		if err != nil {
			return err
		}
		return c.SendString(string(output))
	}
}
