FROM alpine:3.12

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add curl ca-certificates \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["/usr/bin/curl"]
