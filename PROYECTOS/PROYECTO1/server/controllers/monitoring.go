package controllers

import (
	"os/exec"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Monitoring() fiber.Handler {
	return func(c *fiber.Ctx) error {
		freeRam, err := GetRam()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al obtener la información de la RAM",
			})
		}
		/*
		   cpu, err := GetCpu()
		   if err != nil {
		       return c.Status(500).JSON(fiber.Map{
		           "error": "Error al obtener la información del CPU",
		       })
		   }
		*/

		return c.JSON(fiber.Map{
			"ram": fiber.Map{
				"free": freeRam,
			},
			"cpu": fiber.Map{
				"free": 500,
			},
		})
	}
}
func GetRam() (int, error) {
	out, err := exec.Command("cat", "/proc/ram_so1_1s2024").Output()
	if err != nil {
		return 0, err
	}
	ram, err := strconv.Atoi(strings.TrimSuffix(string(out), "\n"))
	if err != nil {
		return 0, err
	}
	return ram, nil
}
