# Node.js stream with postgres database

A exemple showing how to export large data from database using [node.js streams](https://nodejs.org/api/stream.html)

## Prerequisites

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- Either [node.js v14](https://nodejs.org/en/) or [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm)

## Instalation

### 1. Start container

- To build and start the containers

```bash
docker-compose up --build
```

- To detach the process from terminal

```bash
docker-compose up --build -d
```

### 2. Using node v14 (if not run `fnm use` or `nvm use`):

```bash
npx knex migrate:latest
```

### 3. Connect with database and run the sql inside sql folder `./sql/insert_sales.sql`

## Start containers

```bash
docker-compose start
```

- To detach the process from terminal

```bash
docker-compose start -d
```

## Stop containers

```bash
docker-compose stop
```

## Delete containers

```bash
docker-compose down
```
