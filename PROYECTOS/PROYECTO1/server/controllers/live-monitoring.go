package controllers

import (
	"math"
	"os/exec"
	"server/db"
	"server/models"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func LiveMonitoring() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Obtiene la información de los módulos
		freeRam, err := GetRam()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al obtener la información de la RAM",
			})
		}
		freeRam = freeRam - 190

		usedCpu, err := GetCpu()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al obtener la información de la CPU",
			})
		}
		cpuPercentaje := math.Round(float64(usedCpu)/100000*100) / 100

		// Guarda la información en la base de datos
		now := time.Now()
		formattedTime := now.Format("15:04:05")

		go SaveRam(freeRam, formattedTime)
		go SaveCpu(cpuPercentaje, formattedTime)

		return c.JSON(fiber.Map{
			"ram": fiber.Map{
				"free": freeRam,
			},
			"cpu": fiber.Map{
				"percentage": cpuPercentaje,
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

func GetCpu() (int, error) {
	out, err := exec.Command("cat", "/proc/cpu_so1_1s2024").Output()
	if err != nil {
		return 0, err
	}
	cpu, err := strconv.Atoi(strings.TrimSuffix(string(out), "\n"))
	if err != nil {
		return 0, err
	}
	return cpu, nil
}

func SaveRam(ram int, time string) error {
	ramModel := models.RAM{
		Value: ram,
		Time:  time,
	}
	err := db.DB.Create(&ramModel).Error
	if err != nil {
		return err
	}
	return nil
}

func SaveCpu(cpu float64, time string) error {
	cpuModel := models.CPU{
		Value: cpu,
		Time:  time,
	}
	err := db.DB.Create(&cpuModel).Error
	if err != nil {
		return err
	}
	return nil
}
