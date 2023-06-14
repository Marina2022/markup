FROM alpine:3.11.5

RUN apk add --no-cache nginx && mkdir -p /run/nginx

COPY default.conf /etc/nginx/conf.d/

COPY . /opt

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
