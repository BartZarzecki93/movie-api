const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title'],
	},
	directory: {
		type: String,
	},
	genre: {
		type: String,
	},
	released: {
		type: Date,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model(
	'Movie',
	MovieSchema
);
