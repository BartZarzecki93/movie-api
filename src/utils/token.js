const jwt = require('jsonwebtoken');

exports.authFactory = (secret) => (user) => {
	return jwt.sign(
		{
			userId: user._id,
			name: user.name,
			role: user.role,
		},
		secret,
		{
			issuer: process.env.JWT_ISSUER,
			subject: `${user._id}`,
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};
