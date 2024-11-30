#https://hub.docker.com/r/vbardella/fullcycle

FROM golang:alpine AS builder

WORKDIR /go/src

RUN go mod init example/hello

COPY . .

RUN go build -o fullcycle .


ENTRYPOINT [ "./fullcycle" ]


FROM scratch

WORKDIR /app

COPY --from=builder /go/src/fullcycle .

ENTRYPOINT [ "./fullcycle" ]


