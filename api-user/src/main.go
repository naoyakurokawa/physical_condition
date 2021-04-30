package main

import (
	"context"
	"fmt"
	"log"
	"net"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/naoyakurokawa/physical_condition/api-user/models"
	pb "github.com/naoyakurokawa/physical_condition/api-user/pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

const (
	port = ":9090"
)

type server struct {
	db *sqlx.DB
}

// GET Users
func (s *server) GetUsers(ctx context.Context, r *pb.GetUsersRequest) (*pb.GetUsersResponse, error) {
	var users, err = models.GetUsers(ctx, s.db, *r)
	return &pb.GetUsersResponse{Users: users}, err
}

// CreateUser
func (s *server) CreateUser(ctx context.Context, r *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
	var _, err = models.CreateUser(ctx, s.db, *r)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return &pb.CreateUserResponse{}, nil
}

// GetUserById
func (s *server) GetUserById(ctx context.Context, r *pb.GetUserByIdRequest) (*pb.GetUserByIdResponse, error) {
	var id = r.Id
	var user, err = models.GetUserById(ctx, s.db, id)
	return &pb.GetUserByIdResponse{User: user}, err
}

// DeleteUser
func (s *server) DeleteUser(ctx context.Context, r *pb.DeleteUserRequest) (*pb.DeleteUserResponse, error) {
	var id = r.Id
	err := models.DeleteUser(ctx, s.db, id)
	if err != nil {
		log.Println(err)
		return &pb.DeleteUserResponse{IsDelete: false}, nil
	}
	return &pb.DeleteUserResponse{IsDelete: true}, nil
}

// Login
func (s *server) Login(ctx context.Context, r *pb.LoginRequest) (*pb.LoginResponse, error) {
	user_id, uuid, err := models.LoginUser(ctx, s.db, *r)
	if err != nil {
		log.Printf("error : %s", err)
		return nil, err
	}
	grpc.SetHeader(ctx, metadata.Pairs("login_token", uuid))
	return &pb.LoginResponse{Id: user_id, Token: uuid, IsLogin: true}, nil
}

// GetUserBySession
func (s *server) GetUserBySession(ctx context.Context, r *pb.GetUserBySessionRequest) (*pb.GetUserBySessionResponse, error) {
	var token = r.Token
	var user, err = models.GetUserBySession(ctx, s.db, token)
	return &pb.GetUserBySessionResponse{User: user}, err
}

func main() {
	se := &server{}
	var err error
	se.db, err = sqlx.Open("mysql", "root:user_service@tcp(127.0.0.1:13306)/user_service")
	if err != nil {
		log.Fatalln(err)
	}

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterUserServiceServer(s, se)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %c", err)
	}
}
