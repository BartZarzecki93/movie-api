const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},
	username: {
		type: String,
		required: [true, 'Please add an username'],
		unique: true,
	},
	role: {
		type: String,
		enum: ['premium', 'basic'],
		default: 'user',
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model(
	'User',
	UserSchema
);
