const Movie = require('../models/Movie');
const AuthError = require('../utils/errorAuth');
const asyncHandler = require('../middleware/async');
const { fetchMovie } = require('../utils/imdb');

exports.createMovie = asyncHandler(
	async (req, res, next) => {
		//fetch movie
		const movieIMDB = await fetchMovie(
			req.body.title
		);

		// Check for published bootcamp
		const publishedBootcamp = await Movie.find({
			user: req.user.id,
		});

		// // If the user is not an basic, they can only add 5 bootcamp in a month
		if (
			publishedBootcamp.length <= 5 &&
			req.user.role == 'basic'
		) {
			console.log('I AM BASIC');
			// return next(
			// 	new AuthError(
			// 		`The user with ID ${req.user.id} has already published a bootcamp`,
			// 		400
			// 	)
			// );
		}

		const movie = await Movie.create({
			user: req.user.id,
			title: movieIMDB.Title,
			directory: movieIMDB.Director,
			genre: movieIMDB.Genre,
			released: movieIMDB.Released,
		});

		return res.status(201).json({
			success: true,
			data: movie,
		});
	}
);

exports.getMovies = asyncHandler(
	async (req, res, next) => {
		const movies = await Movie.find({
			user: req.user.id,
		});
		return res.status(201).json({
			success: true,
			data: movies,
		});
	}
);
