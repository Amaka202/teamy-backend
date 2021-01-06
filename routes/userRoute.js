const express = require('express');

const router = express.Router();

const getUser = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');

router.get('/user', checkToken, getUser);

module.exports = router;