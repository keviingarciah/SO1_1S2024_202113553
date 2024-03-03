package controllers

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"server/db"
	"server/models"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Monitoring() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Obtiene la información de los módulos
		freeRam, err := GetRam()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al obtener la información de la RAM",
			})
		}

		infoCpu, err := GetCpu()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al obtener la información del CPU",
			})
		}

		var cpuData map[string]interface{}
		err = json.Unmarshal([]byte(infoCpu), &cpuData)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Error al deserializar la información del CPU",
			})
		}

		cpuPorcentaje := cpuData["cpu_porcentaje"].(float64)
		cpuTotal := cpuData["cpu_total"].(float64)
		fmt.Println(cpuPorcentaje / 1000000)
		fmt.Println(cpuTotal / 1000000)

		// Guarda la información en la base de datos
		//now := time.Now()
		//formattedTime := now.Format("15:04:05")

		//go SaveRam(freeRam, formattedTime)
		//go SaveCpu(len(infoCpu), formattedTime)

		return c.JSON(fiber.Map{
			"ram": fiber.Map{
				"free": freeRam,
			},
			"cpu": cpuData,
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

func GetCpu() (string, error) {
	out, err := exec.Command("cat", "/proc/cpu_so1_1s2024").Output()
	if err != nil {
		return "", err
	}
	cpu := strings.TrimSuffix(string(out), "\n")
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

func SaveCpu(cpu int, time string) error {
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
