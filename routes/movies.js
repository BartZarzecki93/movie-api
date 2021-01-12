const { Router } = require('express');
const {
	createMovie,
	getMovies,
} = require('../controllers/movies');

//Routes
const router = Router();
const {
	protect,
} = require('../middleware/protect');

router.post('', protect, createMovie);
router.get('', protect, getMovies);

module.exports = router;
