const express = require('express');

const router = express.Router();

const { signUpUser } = require('../controllers/auth');
const { loggIn } = require('../controllers/auth');
const { sendMail } = require('../utils/sendMail');

console.log(sendMail);

router.post('/signup', signUpUser);

router.post('/login', loggIn);

module.exports = router;