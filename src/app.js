const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/error');
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');
const morgan = require('morgan');
// Load env vars
dotenv.config({
	path: './config/config.env',
});

// Connect to database
connectDB();

if (!process.env.JWT_SECRET) {
	throw new Error(
		'Missing JWT_SECRET env var. Set it and restart the server'
	);
}

const app = express();

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);

app.use(bodyParser.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/movies', movieRouter);

app.use(errorHandler);

//initial
app.use((error, _, res, __) => {
	console.error(
		`Error processing request ${error}. See next message for details`
	);
	console.error(error);

	return res
		.status(500)
		.json({ error: 'internal server error' });
});

module.exports = app;
