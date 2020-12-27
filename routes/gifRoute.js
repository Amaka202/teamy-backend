const express = require('express');

const router = express.Router();

const {
  postGif, deleteGif
} = require('../controllers/gifsController');

// const checkToken = require('../middleware/checkToken');

// router.get('/gifs', checkToken, getArticles);

router.post('/gifs', postGif);

router.post('/gifs/:id', deleteGif);

module.exports = router;