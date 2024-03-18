# Proyecto 1

En este proyecto, se tiene como objetivo principal implementar un sistema de monitoreo de
recursos del sistema y gestión de procesos, empleando varias tecnologías y lenguajes de
programación. El sistema resultante permitirá obtener información clave sobre el rendimiento del
computador, procesos en ejecución y su administración a través de una interfaz amigable.

## Tecnologías empleadas

Para este proyecto se hizo uso de las siguientes tecnologías:

- **Docker:** Docker es una plataforma de código abierto que permite a los desarrolladores
  construir, empaquetar y ejecutar aplicaciones en contenedores.
- **Golang:** Go es un lenguaje de programación de código abierto que facilita la creación de software simple, confiable y eficiente.
- **React:** React es una biblioteca de JavaScript para construir interfaces de usuario.
- **MySQL:** MySQL es un sistema de gestión de bases de datos relacional, que permite
  almacenar y recuperar datos.
- **KVM:** KVM (Kernel-based Virtual Machine) es una solución de virtualización de
  infraestructura de código abierto para Linux.
- **Nginx:** Nginx es un servidor web/proxy inverso ligero de alto rendimiento y un proxy
  para protocolos de correo electrónico.
- **Git:** Git es un sistema de control de versiones distribuido de código abierto.

### Componentes

A continuación, se describen los componentes principales del proyecto:

## Modulos

Estos siendo programados en C, se encargan de la recolección de información del sistema, como la memoria RAM, la CPU y los procesos en ejecución. Además, se encargan de la gestión de procesos, como la creación de procesos, la terminación de procesos y la priorización de procesos. Estos modulos se insertan a la máquina virtual y se comunican con el backend a través de comandos.

## Backend

El backend del sistema fue desarrollado en Golang, y se encarga de la recolección de información, esto a través de la librería `fiber` que permite la creación de servidores web de manera sencilla y rápida. La información recolectada es almacenada en una base de datos MySQL, para esto se hizo uso de la librería `gorm` que permite la interacción con la base de datos de manera sencilla.

## Frontend

El frontend del sistema fue desarrollado en React, y se encarga de la visualización de la información recolectada por el backend. Se usó `vite` para la creación del proyecto, y `fetch` para la comunicación con el backend. Añadir que para los componenntes principales de graficación se utilizaron las librerías `chart.js` y `visjs`. Y para la estilización de la interfaz se hizo uso de `tailwindcss`.

## Base de datos

La base de datos del sistema fue desarrollada en MySQL, y se encarga de almacenar la información recolectada por el backend. Se crearon dos tablas, estas para poder mostrar en la gráfica histórica la información recolectada. La primera tabla almacena la información de la memoria RAM, y la segunda tabla almacena la información de la CPU.

## Docker

Para la implementación de Docker, se crearon 3 contenedores, uno para el backend, otro para el frontend y otro para la base de datos. Estos contenedores se comunican entre sí a través de una red creada por Docker. Además, se creó un archivo `docker-compose.yml` que permite la creación de los contenedores de manera sencilla. Las imágenes de los contenedores se subieron a Docker Hub para su fácil acceso en cualquier máquina.

## Nginx

Para la implementación de Nginx, se creó un contenedor que actúa como proxy inverso, y se encarga de redirigir las peticiones al backend y al frontend. Además, se creó un archivo de configuración que permite la comunicación entre el proxy inverso y los contenedores. Su configuración también funciona el alojamiento de la aplicación en el puerto 80.

## KVM

Para la implementación de KVM, se creó una máquina virtual que actúa como un servidor de pruebas, y se encarga de alojar los módulos. Esta siendo de Ubuntu Server 20.04.2 LTS, se le instalaron las herramientas necesarias para levantar los contenedores de Docker, y se le insertaron los módulos.

## Configuración para el despliegue

## Dockerfiles

### Backend

```Dockerfile
#build stage
FROM golang:alpine AS builder
RUN apk add --no-cache git
WORKDIR /go/src/app
COPY . .
RUN go get -d -v
RUN go build -o /go/bin/app

#final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/app /app
ENTRYPOINT ["/app"]
EXPOSE 8080
```

### Frontend

```Dockerfile
FROM node:18.13.0-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
```

## Nginx

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://so1_p1_server:8080;
    }
}
```

## Docker-compose

```yml
version: "3.8"

services:
  db:
    image: mysql
    container_name: testdb
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=sopes_db
    ports:
      - 3306:3306
    volumes:
      - db-data:/var/lib/mysql
  server:
    image: keviingarciah/so1_p1_server:v1.0
    container_name: so1_p1_server
    privileged: true
    pid: host
    restart: always
    ports:
      - 8080:8080
    volumes:
      - /proc:/host_proc
    depends_on:
      - db
  client:
    image: keviingarciah/so1_p1_client:v2.0
    container_name: so1_p1_client
    restart: always
    ports:
      - 80:80
    depends_on:
      - server
volumes:
  db-data:
```
