const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const AuthError = require('../utils/errorAuth');
const {
	authFactory,
} = require('../middleware/token');

exports.register = asyncHandler(
	async (req, res, next) => {
		const {
			name,
			username,
			password,
			role,
		} = req.body;

		// Create user
		const user = await User.create({
			name,
			username,
			password,
			role,
		});

		sendToken(user, res, next, 201);
	}
);

exports.login = asyncHandler(
	async (req, res, next) => {
		if (!req.body) {
			throw new AuthError(
				'Invalid payload',
				400
			);
		}

		const { username, password } = req.body;

		if (!username || !password) {
			throw new AuthError(
				'Invalid payload (need username and password)',
				400
			);
		}

		//Check for a user and password
		const user = await User.findOne({
			username: username,
		}).select('+password');

		if (!user || user.password !== password) {
			throw new AuthError(
				'User do not exist/Invalid credentials',
				400
			);
		}

		sendToken(user, res, next, 200);
	}
);

const sendToken = (
	user,
	res,
	next,
	statusCode
) => {
	try {
		const token = authFactory(
			process.env.JWT_SECRET
		)(user);

		// req.headers.authorization =
		// 	'Bearer ' + token;

		// console.log(req.headers);
		return res
			.status(statusCode)
			.json({ token });
	} catch (error) {
		if (error instanceof AuthError) {
			return res
				.status(401)
				.json({ error: error.message });
		}

		next(error);
	}
};
