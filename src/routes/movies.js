const { Router } = require('express');
const {
	createMovie,
	getMovies,
} = require('../controllers/movies');
const {
	protect,
} = require('../middleware/protect');

//Routes
const router = Router();

router.post('', protect, createMovie);
router.get('', protect, getMovies);

module.exports = router;
