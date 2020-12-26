const express = require('express');

const router = express.Router();

const { signUpUser } = require('../controllers/auth');
const { loggIn } = require('../controllers/auth');

router.post('/signup', signUpUser);

router.post('/login', loggIn);

module.exports = router;