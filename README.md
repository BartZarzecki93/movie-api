# Movie-api

> Backend API for IMdb movies

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own or you can use:

MONGO_URI = mongodb+srv://bart123:bart123@cluster0.hcu1x.mongodb.net/movies-api?retryWrites=true&w=majority

PORT = 3000

NODE_ENV = development

JWT_SECRET=secret

JWT_EXPIRE=30m

JWT_ISSUER=https://www.netguru.com/

IMDB_KEY = 262b69da

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Run locally with docker

1. Clone this repository
1. Run from root dir

```
docker-compose up -d
```

By default the auth service will start on port `3000`

To stop the authorization service run

```
docker-compose down
```

## Documentation

You can access full documentation(SWAGER) with

```
http://localhost:3000/api-docs/

```
