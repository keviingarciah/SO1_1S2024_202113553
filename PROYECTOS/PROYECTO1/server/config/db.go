package config

import "fmt"

const (
	DBUser = "root"
	DBPass = "123456"
	DBHost = "testdb"
	DBPort = "3306"
	DBName = "sopes_db"
)

func GetDSN() string {
	connection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", DBUser, DBPass, DBHost, DBPort, DBName)
	return connection
}
