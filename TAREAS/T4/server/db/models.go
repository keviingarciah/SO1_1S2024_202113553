package db

import (
	"gorm.io/gorm"
)

type Vote struct {
	gorm.Model

	Album  string
	Year   string
	Artist string
	Ranked string
}

func (Vote) TableName() string {
	return "voto"
}
