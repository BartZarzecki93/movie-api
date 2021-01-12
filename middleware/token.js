const jwt = require('jsonwebtoken');

const authFactory = (secret) => (user) => {
	return jwt.sign(
		{
			userId: user._id,
			name: user.name,
			role: user.role,
		},
		secret,
		{
			issuer: 'https://www.netguru.com/',
			subject: `${user._id}`,
			expiresIn: 30 * 60,
		}
	);
};

module.exports = {
	authFactory,
};
