# Build Container
FROM golang:alpine
WORKDIR /go/src/github.com/naoyakurokawa/physical_condition/api-user
COPY ./src* .
RUN apk add --no-cache alpine-sdk
RUN apk update
RUN apk add git
RUN go mod download
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
CMD ["go", "run", "main.go"]