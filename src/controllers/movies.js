const Movie = require('../models/Movie');
const AuthError = require('../utils/errorAuth');
const asyncHandler = require('../middleware/async');
const { fetchMovie } = require('../utils/imdb');
const {
	memberships,
} = require('../utils/membership');

exports.createMovie = asyncHandler(
	async (req, res, next) => {
		//check for basic membership
		if (req.user.role == 'basic') {
			const count = await memberships(
				req.user.id
			);

			if (count == 5) {
				return next(
					new AuthError(
						`You already reached your limit (5 movies per month) in 2021`,
						400
					)
				);
			}
		}

		//fetch movie
		const movieIMDB = await fetchMovie(
			req.body.title
		);

		//add movie to db
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
