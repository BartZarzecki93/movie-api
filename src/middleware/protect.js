const { verify } = require('jsonwebtoken');
const asyncHandler = require('./async');
const AuthError = require('../utils/errorAuth');
const User = require('../models/User');

exports.protect = asyncHandler(
	async (req, res, next) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith(
				'Bearer'
			)
		) {
			// Set token from Bearer token in header
			token = req.headers.authorization.split(
				' '
			)[1];
		}

		// Make sure token exists
		if (!token) {
			return next(
				new AuthError(
					'Not authorized to access this route',
					401
				)
			);
		}

		try {
			// Verify token
			const decoded = verify(
				token,
				process.env.JWT_SECRET
			);

			req.user = await User.findById(
				decoded.userId
			);

			next();
		} catch (err) {
			return next(
				new AuthError(
					'Not authorized to access this route',
					401
				)
			);
		}
	}
);
