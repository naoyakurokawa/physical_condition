package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	"github.com/naoyakurokawa/physical_condition/api-post/models"
	pb "github.com/naoyakurokawa/physical_condition/api-post/pb"
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

// GetBodyList
func (s *server) GetBodyList(ctx context.Context, r *pb.GetBodyListRequest) (*pb.GetBodyListResponse, error) {
	var bodyList, err = models.GetBodyList(ctx, s.db, *r)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return &pb.GetBodyListResponse{BodyList: bodyList}, nil
}

func main() {
	se := &server{}
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}
	USER := os.Getenv("DB_USER")
	PASS := os.Getenv("DB_PASS")
	PROTOCOL := "tcp(" + os.Getenv("DB_ADDRESS") + ")"
	DB_NAME := os.Getenv("DB_NAME")
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DB_NAME
	se.db, err = sqlx.Open("mysql", CONNECT)
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
