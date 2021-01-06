const express = require('express');

const router = express.Router();

const getUsers = require('../controllers/usersController');
const checkToken = require('../middleware/checkToken');

router.get('/users', checkToken, getUsers);

module.exports = router;
