package main

import (
	"context"
	"fmt"
	"log"
	"net"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/naoyakurokawa/physical_condition/models"
	pb "github.com/naoyakurokawa/physical_condition/pb"
	"google.golang.org/grpc"
)

const (
	port = ":9091"
)

type server struct {
	db *sqlx.DB
}

// CreateBody
func (s *server) CreateBody(ctx context.Context, r *pb.CreateBodyRequest) (*pb.CreateBodyResponse, error) {
	var _, err = models.CreateBody(ctx, s.db, *r)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return &pb.CreateBodyResponse{}, nil
}

func main() {
	se := &server{}
	var err error
	se.db, err = sqlx.Open("mysql", "root:post_service@tcp(127.0.0.1:23306)/post_service")
	if err != nil {
		log.Fatalln(err)
	}

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterPostServiceServer(s, se)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %c", err)
	}
}
