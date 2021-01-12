const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const asyncHandler = require('../middleware/async');
const Movie = require('../models/Movie');

exports.memberships = asyncHandler(
	async (userId) => {
		//get current month
		const todaysDate = new Date();
		const todaysMonth =
			todaysDate.getUTCMonth() + 1;

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
					title: '$_id',
					_id: 0,
				},
			},
			{ $sort: { month_added: 1 } },
		]);
		const results = await query;

		//count movies in the current month
		const count = results.filter(
			(movie) =>
				movie.month_added == todaysMonth
		);

		return count.length;
	}
);
