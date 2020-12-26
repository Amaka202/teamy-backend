const express = require('express');

const router = express.Router();

const getUser = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');

router.get('/users', checkToken, getUser);

module.exports = router;
