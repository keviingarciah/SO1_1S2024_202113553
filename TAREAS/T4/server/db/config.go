package db

import "fmt"

const (
	DBUser = "root"
	DBPass = "mysql"
	DBHost = "34.28.246.115"
	DBPort = "3306"
	DBName = "tarea4"
)

func GetDSN() string {
	connection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", DBUser, DBPass, DBHost, DBPort, DBName)
	return connection
}
