const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const asyncHandler = require('../middleware/async');
const Movie = require('../models/Movie');

exports.memberships = asyncHandler(
	async (userId) => {
		//get current month
		const todaysMonth =
			new Date().getUTCMonth() + 1;
		const todaysYear = new Date().getUTCFullYear();

		const query = Movie.aggregate([
			{
				$match: {
					user: ObjectId(userId),
				},
			},
			{
				$project: {
					month_added: {
						$month: '$createdAt',
					},
					year_added: {
						$year: '$createdAt',
					},
					title: '$_id',
					_id: 0,
				},
			},
			{ $sort: { month_added: 1 } },
		]);
		const results = await query;
		console.log(results);
		//count movies in the current month
		const count = results.filter(
			(movie) =>
				movie.month_added == todaysMonth &&
				movie.year_added == todaysYear
		);

		return count.length;
	}
);
