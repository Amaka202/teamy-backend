const express = require('express');

const router = express.Router();

const {
  editArticle, postArticles, deleteArticle, getArticles
} = require('../controllers/articlesController');

const checkToken = require('../middleware/checkToken');

router.get('/articles', checkToken, getArticles);

router.post('/articles', postArticles);

router.post('/articles/:id', editArticle);

router.post('/articles/:id', deleteArticle);

module.exports = router;