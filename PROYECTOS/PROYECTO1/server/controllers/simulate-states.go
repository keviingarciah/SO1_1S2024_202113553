package controllers

import (
	"fmt"
	"os/exec"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func SimulateStates() fiber.Handler {
	return func(c *fiber.Ctx) error {
		state := c.Params("state")
		var pid string

		switch state {
		case "start":
			pidInt, err := NewProcess()
			if err != nil {
				return c.Status(500).SendString(err.Error())
			}
			pid = strconv.Itoa(pidInt)
		case "stop", "resume", "kill":
			pid = c.Query("pid")
			if pid == "" {
				return c.Status(400).SendString("Se requiere el parámetro pid")
			}
		}

		switch state {
		case "stop":
			StopProcess(pid)
		case "resume":
			ResumeProcess(pid)
		case "kill":
			KillProcess(pid)
		}

		// Devuelve el objeto Go como un objeto JSON
		return c.JSON(map[string]string{
			"pid":   pid,
			"state": state,
		})
	}
}

func NewProcess() (int, error) {
	cmd := exec.Command("sleep", "infinity")
	err := cmd.Start()

	if err != nil {
		fmt.Println(err)
		return 0, err
	}
	// Obtener el PID del proceso hijo
	pid := cmd.Process.Pid

	fmt.Println("Proceso iniciado con PID", pid)

	return pid, nil
}

func StopProcess(pidStr string) {
	fmt.Println("Deteniendo proceso con PID", pidStr)

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		fmt.Println("El parámetro 'pid' debe ser un número entero")
		return
	}

	// Enviar señal SIGSTOP al proceso con el PID proporcionado stop kill -SIGSTOP PID
	cmd := exec.Command("kill", "-SIGSTOP", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error al detener el proceso con PID %d", pid)
		return
	}
}

func ResumeProcess(pidStr string) {
	fmt.Println("Resumiendo proceso con PID", pidStr)

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		fmt.Println("El parámetro 'pid' debe ser un número entero")
		return
	}

	// Enviar señal SIGSTOP al proceso con el PID proporcionado stop kill -SIGSTOP PID
	cmd := exec.Command("kill", "-SIGCONT", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error al resumir el proceso con PID %d", pid)
		return
	}
}

func KillProcess(pidStr string) {
	fmt.Println("Matando proceso con PID", pidStr)

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		fmt.Println("El parámetro 'pid' debe ser un número entero")
		return
	}

	// Enviar señal SIGSTOP al proceso con el PID proporcionado stop kill -SIGSTOP PID
	cmd := exec.Command("kill", "-9", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error al matar el proceso con PID %d", pid)
		return
	}
}
