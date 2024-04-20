# Tarea 4

Sistema cliente-servidor de tipo gRPC en golang, en el cual se puedan visualizar datos enviados desde el generador de tráfico locust construído con python; los datos deben estar en formato JSON. Posteriormente deben guardarse en una base de datos de Cloud SQL y los datos deben ser mostrados en un cliente.

## gRPC

### Instalación de Compilador

```bash
sudo apt install protobuf-compiler
```

### Instalar dependencias del Cliente

```bash
go get google.golang.org/grpc
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

go get github.com/gofiber/fiber/v2

```

### Instalar dependencias del Servidor

```bash
go get google.golang.org/grpc
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

### Compilación de los archivos proto

```bash
protoc --go_out=. --go-grpc_out=. <name>.proto
```

## Locust

### Instalación de Locust

```bash
sudo apt install python3-locust
```

### Instalar dependencias de Locust

```bash
pip3 install locust
```

### Ejecución de Locust

```bash
locust -f <name>.py
```

## Video

https://youtu.be/xCWd94KwOdE
