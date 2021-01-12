const fetch = require('node-fetch');
const asyncHandler = require('../middleware/async');
const AuthError = require('./errorAuth');

exports.fetchMovie = asyncHandler(
	async (name) => {
		const movie = await fetch(
			`https://www.omdbapi.com/?t=${name}&apikey=${process.env.IMDB_KEY}`
		);

		const fetchedMovie = await movie.json();

		if (fetchedMovie.Response == 'False') {
			throw new AuthError(
				'Could not find a movie with provided title',
				401
			);
		}

		return fetchedMovie;
	}
);
