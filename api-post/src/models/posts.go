package models

import (
	"context"
	"log"
	"strings"

	// "fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	pb "github.com/naoyakurokawa/physical_condition/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func CreateBody(ctx context.Context, db *sqlx.DB, request pb.CreateBodyRequest) (int32, error) {
	body := pb.Body{
		Date:   request.GetDate(),
		UserId: request.GetUserId(),
		Weight: request.GetWeight(),
		Fat:    request.GetFat(),
	}
	//メタデータ取得
	// md, ok := metadata.FromIncomingContext(ctx)
	// if ok == false {
	// 	return -1, nil
	// }
	// log := md["login_token"][0]

	//体重必須チェック
	err := checkRequired("体重", request.GetWeight())
	if err != nil {
		return -1, err
	}

	//体脂肪必須チェック
	err = checkRequired("体脂肪", request.GetFat())
	if err != nil {
		return -1, err
	}

	//日付重複チェック
	err = checkDuplicateDates(request.GetDate(), request.GetUserId(), db)
	if err != nil {
		return -1, err
	}

	query := `INSERT INTO body (date, userid, weight, fat) VALUES (:date, :userid, :weight, :fat);`
	tx, err := db.Beginx()
	_, err = tx.NamedExecContext(ctx, query, &body)
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
	return body.Id, nil
}

//Validation関連のメソッド

//必須チェック
func checkRequired(feild string, input int32) error {
	if input == 0 {
		return status.New(codes.InvalidArgument, feild+"を入力して下さい").Err()
	} else {
		return nil
	}
}

//日付重複チェック
func checkDuplicateDates(date string, userid int32, db *sqlx.DB) error {
	var body []*pb.Body
	strings.Replace(date, "/", "-", -1)
	q := `SELECT date FROM body WHERE userid = ? AND date = ?;`
	err := db.Select(&body, q, userid, date)
	if err != nil {
		log.Println(err)
		return err
	}
	if len(body) == 0 {
		return nil
	} else {
		return status.New(codes.InvalidArgument, "その日は既に登録済みです").Err()
	}
}
