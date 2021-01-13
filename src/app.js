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

//swagger documentation
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);

//body parser
app.use(bodyParser.json());

//logging middleware
app.use(morgan('dev'));

//routes
app.use('/auth', authRouter);
app.use('/movies', movieRouter);

//error handling middleware
app.use(errorHandler);

//initial error handling
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
