const express = require('express');

const router = express.Router();

const { signUpUser } = require('../controllers/authController');
const { loggIn } = require('../controllers/authController');

router.post('/signup', signUpUser);

router.post('/login', loggIn);

module.exports = router;