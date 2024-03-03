FROM golang:alpine AS build

WORKDIR /app

COPY . .

RUN go mod download
# Se puede obviar este
RUN go mod verify 

RUN go build -o /server

FROM gcr.io/distroless/base-debian12

WORKDIR /

COPY --from=build /server /server

# Cambiar a 8080
EXPOSE 5000

CMD ["/server"]