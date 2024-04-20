# PROYECTO 2

## Comandos yaml

### Crear

```bash
kubectl apply -f <name>.yaml
```

### Eliminar

```bash
kubectl delete -f <name>.yaml
```

## Comandos logs

### Namespaces

```bash
kubectl get namespaces
```

### Deployments

```bash
kubectl get deployments
kubectl get deployments --all-namespaces
```

## Servicios

```bash
kubectl get services
```

## Pods

```bash
kubectl get pods
```

## Configurar Namespace

```bash
kubectl config set-context --current --namespace=<nombre-del-namespace>
```
