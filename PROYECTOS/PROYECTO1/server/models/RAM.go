package models

import (
	"gorm.io/gorm"
)

type RAM struct {
	gorm.Model

	Value int
	Time  string
}

func (RAM) TableName() string {
	return "ram"
}
