# HOJA DE TRABAJO 1

Este documento proporciona una descripción general de la hoja de trabajo 1. En esta se utiliza la modulación del kernel para la detección de la memoria disponible en el sistema. Utilizando el framework Wails, se crea una aplicación de escritorio que muestra la memoria disponible en el sistema.

## Módulos

**Comandos para compilar e instalar el módulo:**

```bash
# Compila el módulo
make

# Instala el módulo
sudo insmod ram.ko

# Remueve el módulo
sudo rmmod file.ko
```

## Wails

**Comandos para crear y compilar la aplicación:**

```bash
# Crear un nuevo proyecto
wails init -n myproject -t react

# Lanza en modo desarrollo
wails dev

# Compila la aplicación
wails build
```

## Video

https://www.youtube.com/watch?v=CR4QppD4MFs&feature=youtu.be
