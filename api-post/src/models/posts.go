package models

import (
	"context"
	"log"

	// "fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	pb "github.com/naoyakurokawa/physical_condition/pb"
)

func CreateBody(ctx context.Context, db *sqlx.DB, request pb.CreateBodyRequest) (int32, error) {
	//パスワードのハッシュ化
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
