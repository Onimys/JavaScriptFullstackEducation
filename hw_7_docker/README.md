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
