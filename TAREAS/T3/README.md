# Tarea 3

Aplicación utilizando Redis Pub y Sub para comunicación entre dos aplicaciones de servidor (NodeJS como publicador y Python como suscriptor) utilizando la funcionalidad de Google Cloud llamada Memory Store y 2 Instancias de Compute Engine (una para cada servidor).

## Conexion a Redis

Para la conexión a Redis se utilizó la IP de la instancia de Compute Engine que aloja el servicio de Redis Memory Store.

```bash
telnet 10.251.220.195 6379
```

## Publisher

Este será con nodejs y se encargará de publicar mensajes a un canal de Redis.

### **Comandos de Instanciación:**

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm

mkdir pub
cd pub

npm init -y
npm install ioredis

nano publisher.js
```

### **Código de Publisher:**

```javascript
const Redis = require("ioredis");
const conexion = new Redis({
  host: "10.251.220.195",
  port: 6379,
  connectTimeout: 5000,
});

function functionPublish() {
  conexion
    .publish("test", '{msg: "Hola a todos"}')
    .then(() => {
      console.log("Mensaje publicado correctamente");
    })
    .catch((error) => {
      console.error("Error al publicar el mensaje", error);
    });
}

setInterval(functionPublish, 3000);
```

## Subscriber

Este será con python y se encargará de suscribirse a un canal de Redis.

### **Comandos de Instanciación:**

```bash
sudo apt-get update
sudo apt install python3-pip
sudo apt install python3-venv

mkdir sub
cd sub
pip3 install redis

nano app.py
```

### **Código de Subscriber:**

```python
import redis

conexion = redis.StrictRedis(host='10.251.220.195', port=6379, decode_responses=True)

pubsub = conexion.pubsub()

pubsub.subscribe('test')

for mensaje in pubsub.listen():
    print('Mensaje recibido:', mensaje['data'])
```

## Video

https://youtu.be/_-SBiHamrps
