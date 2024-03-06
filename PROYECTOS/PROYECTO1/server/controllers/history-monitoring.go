package controllers

import (
	"server/db"
	"server/models"

	"github.com/gofiber/fiber/v2"
)

func HistoryMonitoring() fiber.Handler {
	return func(c *fiber.Ctx) error {
		historyRam := getHistoryRam()
		historyCpu := getHistoryCpu()
		historyTime := getHistoryTime()

		return c.JSON(fiber.Map{
			"data": fiber.Map{
				"ram": historyRam,
				"cpu": historyCpu,
			},
			"history": fiber.Map{
				"time": historyTime,
			},
		})
	}
}

func getHistoryRam() []int {
	var results []models.RAM
	db.DB.Select("value").Order("id desc").Limit(100).Find(&results)

	var values []int
	for _, result := range results {
		values = append(values, int(result.Value))
	}

	return values
}

func getHistoryCpu() []float64 {
	var results []models.CPU
	db.DB.Select("value").Order("id desc").Limit(100).Find(&results)

	var values []float64
	for _, result := range results {
		values = append(values, float64(result.Value))
	}

	return values
}

func getHistoryTime() []string {
	var results []models.RAM
	db.DB.Select("time").Order("id desc").Limit(100).Find(&results)

	var values []string
	for _, result := range results {
		values = append(values, string(result.Time))
	}

	return values
}
