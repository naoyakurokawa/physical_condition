FROM golang:latest as builder

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
WORKDIR /go/src/github.com/naoyakurokawa/physical_condition/api-user
COPY ./src* .
RUN go build main.go

# runtime image
FROM alpine
RUN apk add --no-cache ca-certificates
COPY --from=builder /go/src/github.com/naoyakurokawa/physical_condition/api-user/main /main
EXPOSE 9090
CMD ["./main"]