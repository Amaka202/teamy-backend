const express = require('express');

const router = express.Router({ mergeParams: true });

const postComments = require('../controllers/commentsController');

const getComments = require('../controllers/commentsController');

const checkToken = require('../middleware/checkToken');

router.post('/posts/:postId/comment', checkToken, postComments);

router.get('/posts/:postId/comment', checkToken, getComments);

module.exports = router;
