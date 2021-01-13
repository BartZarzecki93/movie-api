const AuthError = require('../utils/errorAuth');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	//Log to console for dev
	console.log(error);

	//Mongoose bad ObjectId
	if (err.name == 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new AuthError(message, 404);
	}

	//Mongoose duplicate key
	if (err.code == 11000) {
		const message = `Duplicate field value entered, provided ${Object.keys(
			error.keyPattern
		)} already exists`;
		error = new AuthError(message, 400);
	}

	//Mongoose validation error
	if (err._message == 'User validation failed') {
		const message = Object.values(
			err.errors
		).map((val) => val.message);
		error = new AuthError(message, 400);
	}

	return res
		.status(error.statusCode || 500)
		.json({
			success: false,
			error: error.message || 'Server Error',
		});
};

module.exports = errorHandler;
