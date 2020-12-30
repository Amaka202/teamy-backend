const express = require('express');

const router = express.Router({ mergeParams: true });

const postComments = require('../controllers/commentsController');

router.post('/posts/:postId/comment', postComments);

module.exports = router;
