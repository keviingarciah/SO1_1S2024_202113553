# Configuración de Kubernetes

## Comandos Esenciales

### Crear

```bash
kubectl apply -f <name>.yaml
```

### Eliminar

```bash
kubectl delete -f <name>.yaml
```

## Comandos Get

### Namespaces

```bash
kubectl get namespaces
```

### Deployments

```bash
kubectl get deployments
kubectl get deployments --all-namespaces
```

### Servicios

```bash
kubectl get services
kubectl get deployments --all-namespaces

```

### Pods

```bash
kubectl get pods
kubectl get deployments --all-namespaces

```

## Configurar Namespace Predeterminado

```bash
kubectl config set-context --current --namespace=<nombre-del-namespace>
```

## Kafka

### Crear

```bash
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n <nombre_namespace>
kubectl apply -f https://strimzi.io/examples/latest/kafka/kafka-persistent-single.yaml -n <nombre_namespace>
```

## Ingress

```bash
kubectl create ns nginx-ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx -n nginx-ingress
kubectl get services -n nginx-ingress
```
