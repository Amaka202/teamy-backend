const express = require('express');

const router = express.Router();

const {
  getArticles, editArticle, postArticles, deleteArticle
} = require('../controllers/articlesController');

const checkToken = require('../middleware/checkToken');

router.get('/articles', checkToken, getArticles);

router.post('/articles', postArticles);

router.post('/articles/:id', editArticle);

router.post('/articles/:id', deleteArticle);

module.exports = router;