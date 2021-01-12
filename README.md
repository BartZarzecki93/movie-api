# Movie-api

> Backend API for IMdb movies

Thanks to this app you can:

1. `POST /movies`
   1. Create a movie object based on movie title passed in the request body
   2. Bade on title additional movie details that is fetched from
      https://omdbapi.com/ and saved to the mongo database.
   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create a 5 movies per month (calendar
      month). `Premium` users have no limits.
2. `GET /movies`
   1. Get a list of all movies created by an authorized user.
3. `POST /auth/login`
   1. Login to the app with username and password and get authorization token.
4. `POST /auth/register`
   1. Register to the app with username, password, name and role.
   2. Possible options for role : basic or premium

⚠️ Don't forget to verify user's authorization token before processing the
request. The token should be passed in request's `Authorization` header.

```
Authorization: Bearer <token>
```

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own or you can use:

```
MONGO_URI = (will be send in ab email with the repo link)

PORT = 3000

NODE_ENV = development

JWT_SECRET=secret

JWT_EXPIRE=30m

JWT_ISSUER=https://www.netguru.com/

IMDB_KEY = 262b69da
```

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
2. Go to docker-compose.yml and paste the link that you got in the email under MONGO_URI
3. Run from root dir

```
docker-compose up -d
```

By default the auth service will start on port `3000`

To stop the service run

```
docker-compose down
```

## Documentation

You can access full documentation(SWAGER) with

```
http://localhost:3000/api-docs/

```
