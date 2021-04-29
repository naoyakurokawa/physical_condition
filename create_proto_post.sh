#!/bin/sh

CLIENT_OUTDIR=front/lib
SERVER_OUTPUT_USER_DIR=api-post/src/pb

mkdir -p ${CLIENT_OUTDIR} ${SERVER_OUTPUT_USER_DIR}

protoc --proto_path=proto post.proto \
    --js_out=import_style=commonjs:${CLIENT_OUTDIR} \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTDIR} \
    --go_out=plugins=grpc:${SERVER_OUTPUT_USER_DIR}