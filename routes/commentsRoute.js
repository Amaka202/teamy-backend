const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  postArticleComments, postGifComments
} = require('../controllers/commentsController');

router.post('/articles/:article_id/comment', postArticleComments);

router.post('/gifs/:gif_id/comment', postGifComments);

module.exports = router;
