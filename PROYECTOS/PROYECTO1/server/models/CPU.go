package models

import (
	"gorm.io/gorm"
)

type CPU struct {
	gorm.Model

	Value float64
	Time  string
}

func (CPU) TableName() string {
	return "cpu"
}
