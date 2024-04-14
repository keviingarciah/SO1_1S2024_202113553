package main

import (
	"context"
	"fmt"
	"log"
	"net"
	db "server/db"
	pb "server/proto"

	_ "github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedGetInfoServer
}

const (
	port = ":3001"
)

type Data struct {
	Album  string
	Year   string
	Artist string
	Ranked string
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetArtist())
	data := Data{
		Year:   in.GetYear(),
		Album:  in.GetAlbum(),
		Artist: in.GetArtist(),
		Ranked: in.GetRanked(),
	}
	fmt.Println(data)

	// Guardar en la base de datos
	err := db.SaveData(data.Album, data.Year, data.Artist, data.Ranked)
	if err != nil {
		log.Println(err)
		return &pb.ReplyInfo{Info: "Error al guardar en la base de datos"}, nil
	}

	return &pb.ReplyInfo{Info: "Hola cliente, recibí el album"}, nil
}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	// Conexión a la base de datos
	db.DBConnection()

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}
