package models

import (
	"context"

	// "fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	pb "github.com/naoyakurokawa/physical_condition/pb"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func GetUsers(ctx context.Context, db *sqlx.DB, request pb.GetUsersRequest) ([]*pb.User, error) {
	//メタデータ取得
	md, ok := metadata.FromIncomingContext(ctx)
	if ok == false {
		return nil, nil
	}
	log.Printf("meta : %s", md["login_token"][0])
	//メターデータの中のlogin_tokenを参照
	login_token := md["login_token"][0]
	log.Println(login_token)
	// sessionテーブルにlogin_tokenに紐づくデータが存在するか確認
	s, err := GetSessionByUuid(ctx, db, login_token)
	// sessionテーブルに存在しなければreturn
	if err != nil {
		log.Println(err)
		return nil, err
	}
	if len(s) == 0 {
		return nil, nil
	}
	var userlist []*pb.User
	q := "SELECT * FROM users"
	err = db.SelectContext(ctx, &userlist, q)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	// log.Printf("userList : %s", userlist)
	return userlist, nil
}

func CreateUser(ctx context.Context, db *sqlx.DB, request pb.CreateUserRequest) (int32, error) {
	//パスワードのハッシュ化
	hash, err := bcrypt.GenerateFromPassword([]byte(request.GetPassword()), 10)
	if err != nil {
		return -1, err
	}
	hash_password := string(hash)
	user := pb.User{
		Name:     request.GetName(),
		Password: hash_password,
	}
	query := `INSERT INTO users (name, password) VALUES (:name, :password);`
	tx, err := db.Beginx()
	_, err = tx.NamedExecContext(ctx, query, &user)
	if err != nil {
		log.Printf("error : %s", err)
		// エラーが発生した場合はロールバックします。
		rollbackErr := tx.Rollback()
		if rollbackErr != nil {
			return -1, rollbackErr
		}
		// エラー内容を返却します。
		return -1, err
	}
	err = tx.Commit()
	if err != nil {
		return -1, err
	}
	return user.Id, nil
}

func GetUserById(ctx context.Context, db *sqlx.DB, id int32) ([]*pb.User, error) {
	log.Println(id)
	var user []*pb.User
	q := `SELECT * FROM users WHERE ID = ?;`
	err := db.SelectContext(ctx, &user, q, id)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return user, nil
}

func DeleteUser(ctx context.Context, db *sqlx.DB, id int32) error {
	q := `DELETE FROM users WHERE ID = ?;`
	_, err := db.ExecContext(ctx, q, id)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}

func LoginUser(ctx context.Context, db *sqlx.DB, request pb.LoginRequest) (int32, string, error) {
	// defer func() error {
	// 	if r := recover(); r != nil {
	// 		err := fmt.Errorf("panic recovered: %s", r)
	// 		return err
	// 	}
	// 	return nil
	// }()

	var user []*pb.User

	//ユーザー名必須チェック
	err := CheckRequired("名前", request.GetName())
	if err != nil {
		return -1, "", err
	}

	//パスワード必須チェック
	err = CheckRequired("パスワード", request.GetPassword())
	if err != nil {
		return -1, "", err
	}

	//ユーザー存在チェック
	q := `SELECT * FROM users WHERE NAME = ?;`
	err = db.SelectContext(ctx, &user, q, request.GetName())

	if err != nil {
		return -1, "", status.New(codes.InvalidArgument, "ユーザー名が間違っています").Err()
	}

	//ユーザーが存在しなければ、エラーを返す
	if user == nil {
		return -1, "", status.New(codes.InvalidArgument, "ユーザー名が間違っています").Err()
	}

	//パスワード一致チェック
	err = CheckMatchPassword(user[0].Password, request.GetPassword())
	if err != nil {
		return -1, "", err
	}

	//セッションDB登録
	session := &pb.Session{
		Uuid:   createUUID(),
		Name:   user[0].Name,
		Userid: user[0].Id,
	}
	err = CreateSession(session, db)
	if err != nil {
		log.Println(err)
		return -1, "", err
	}

	return user[0].Id, session.Uuid, nil
}

func createUUID() (uuidobj string) {
	u, _ := uuid.NewUUID()
	uuidobj = u.String()
	return uuidobj
}

func CreateSession(sess *pb.Session, db *sqlx.DB) error {
	query := `INSERT INTO session (id, uuid, name, userid) VALUES (:id, :uuid, :name, :userid);`
	tx, err := db.Beginx()
	if err != nil {
		log.Printf("error : %s", err)
		return err
	}
	_, err = tx.NamedExec(query, &sess)
	if err != nil {
		log.Printf("error : %s", err)
		// エラーが発生した場合はロールバックします。
		rollbackErr := tx.Rollback()
		if rollbackErr != nil {
			log.Printf("rollbackError : %s", rollbackErr)
			return rollbackErr
		}
		// エラー内容を返却します。
		return err
	}
	err = tx.Commit()
	if err != nil {
		log.Printf("error : %s", err)
		return err
	}

	return nil
}

func GetSessionByUuid(ctx context.Context, db *sqlx.DB, uuid string) ([]*pb.Session, error) {
	var session []*pb.Session
	q := `SELECT * FROM session WHERE Uuid = ?;`
	err := db.SelectContext(ctx, &session, q, uuid)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return session, nil
}

//Validation関連のメソッド

//必須チェック
func CheckRequired(feild string, input string) error {
	if input == "" {
		return status.New(codes.InvalidArgument, feild+"は必須です").Err()
	} else {
		return nil
	}
}

//パスワード一致確認
func CheckMatchPassword(dbData string, input string) error {
	err := bcrypt.CompareHashAndPassword([]byte(dbData), []byte(input))
	if err != nil {
		return status.New(codes.InvalidArgument, "パスワードが間違っています").Err()
	} else {
		return nil
	}
}
