package main

import (
	"context"
	"os/exec"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Gets ram usage
func (a *App) GetRamUsage() string {
	out, err := exec.Command("cat", "/proc/ram_202113553").Output()
	if err != nil {
		return "Error al obtener el contenido del archivo"
	}
	return strings.TrimSuffix(string(out), "\n")
}
