package models

import (
	"gorm.io/gorm"
)

type CPU struct {
	gorm.Model

	Value int
	Time  string
}

func (CPU) TableName() string {
	return "cpu"
}
