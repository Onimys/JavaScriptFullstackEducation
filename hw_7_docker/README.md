# HW_7_Docker

- [x] Запустить nginx в качестве обратного прокси для приложения на Node.js в
        контейнере
- [x] Запустить PostgreSQL в контейнере, подключиться к контейнеру и
        выполнить SQL скрипты

## Installation

```bash
# install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
# build
$ docker build -t hw_7_docker:latest .

# run
$ docker run --name hw_7_docker -p8000:3000 hw_7_docker

# container development mode
$ docker-compose up -d --build
```

## nginx
Configuration file libs\nginx.conf

## PostgreSql
```cmd
cmd> docker pull postgres:15.2-alpine
cmd> docker run --name PostgreServer -e POSTGRES_PASSWORD=admin -d postgres:15.2-alpine
cmd> docker exec -it PostgreServer psql -U postgres -W postgres

password: admin
postgres=# CREATE DATABASE shop;
postgres=# CREATE TABLE products (
              id serial NOt NULL,
              name varchar(123) NOT NUll,
              price decimal(15, 2) NOT NULL,
              balance integer NOT NULL DEFAULT 0
           );
postgres=# INSERT INTO products (name, price, balance) VALUES ('Hello', 10.5, 1);
postgres=# SELECT * FROM products;
 id | name  | price | balance
----+-------+-------+---------
  1 | Hello | 10.50 |       1
(1 row)
```