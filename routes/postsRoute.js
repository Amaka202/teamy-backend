const express = require('express');

const router = express.Router();

const {
  deletePost, getPosts, createPost, editArticle
} = require('../controllers/postsController');

const checkToken = require('../middleware/checkToken');

router.get('/posts', checkToken, getPosts);

router.post('/posts', checkToken, createPost);

router.patch('/posts/:postId', checkToken, editArticle);

router.delete('/posts/:postId', checkToken, deletePost);

module.exports = router;