const {
	closeDatabase,
	clearDatabase,
} = require('./db-handler');

const app = require('../app');
const supertest = require('supertest');
const User = require('../models/User');
const Movie = require('../models/Movie');
const request = supertest(app);

const registerUrl = '/auth/register';
const loginUrl = '/auth/login';
const moviesUrl = '/movies';

let token = '';

beforeAll(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe(registerUrl, () => {
	it(`POST  ${registerUrl} should return token`, async () => {
		const response = await request
			.post(registerUrl)
			.send({
				role: 'premium',
				name: 'Premium Jim',
				username: 'premium-jim-test',
				password: 'GBLtTyq3E_UNjFnpo9m6',
			})
			.expect(201);

		expect(response.body.token).not.toBe(null);

		User.findOne({
			username: 'premium-jim-test',
		}).then((user) => {
			expect(user).not.toBeNull();
			expect(user.name).toBe('Premium Jim');
		});
	});

	it(`POST  ${registerUrl} should return validation error`, async () => {
		const response = await request
			.post(registerUrl)
			.send({
				role: 'not-premium',
				name: 'Premium Jim',
				username: 'premium-jim-test',
				password: 'GBLtTyq3E_UNjFnpo9m6',
			})
			.expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBeTruthy();
	});

	it(`POST  ${registerUrl} should return duplication error`, async () => {
		const response = await request
			.post(registerUrl)
			.send({
				role: 'not-premium',
				name: 'Premium Jim',
				username: 'premium-jim',
				password: 'GBLtTyq3E_UNjFnpo9m6',
			})
			.expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBeTruthy();
	});
});

describe(loginUrl, () => {
	it(`POST  ${loginUrl} should return wrong credentials error`, async () => {
		const response = await request
			.post(loginUrl)
			.send({
				username: 'premium-jim-test-wrong',
				password: 'GBLtTyq3E_UNjFnpo9m6',
			})
			.expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe(
			'User do not exist/Invalid credentials'
		);
	});

	it('POST ' + loginUrl, async () => {
		const response = await request
			.post(loginUrl)
			.send({
				username: 'premium-jim-test',
				password: 'GBLtTyq3E_UNjFnpo9m6',
			})
			.expect(200);

		token = response.body.token;
		expect(response.body.token).not.toBe(null);
	});
});

describe(moviesUrl, () => {
	it(`GET  ${moviesUrl} should authorize and return list of movies`, async () => {
		const response = await request
			.get(moviesUrl)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		expect(response.body.success).toBe(true);
		expect(response.body.data).toEqual(
			expect.arrayContaining([])
		);
	});

	it(`GET  ${moviesUrl} should return authorization error`, async () => {
		const response = await request
			.get(moviesUrl)
			.expect(401);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe(
			'Not authorized to access this route'
		);
	});
});

describe(moviesUrl, () => {
	it(`POST  ${moviesUrl} should return movie object`, async () => {
		const response = await request
			.post(moviesUrl)
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Holt',
			})
			.expect(201);

		expect(response.body.success).toBe(true);
		expect(response.body.data).toBeTruthy();

		Movie.findOne({
			title: 'Holt',
		}).then((movie) => {
			expect(movie).not.toBeNull();
			expect(movie.title).toBe('Holt');
			expect(movie._id).not.toBe(null);
		});
	});

	it(`POST  ${moviesUrl} should return authorization error`, async () => {
		const response = await request
			.post(moviesUrl)
			.expect(401);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe(
			'Not authorized to access this route'
		);
	});

	it(`POST  ${moviesUrl} should return movie error`, async () => {
		const response = await request
			.post(moviesUrl)
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Holtsdfsdf',
			})
			.expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe(
			'Could not find a movie with provided title'
		);
	});
});
