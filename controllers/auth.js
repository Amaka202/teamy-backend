/* eslint-disable camelcase */

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.JWT_SECRET_CODE;

/* eslint-disable max-len */
const bcrypt = require('bcrypt');

const db = require('../db/db');

const signUpUser = async (req, res, next) => {
  const {
    firstname, lastname, username, profile_img, email, password, gender, jobrole, department
  } = req.body;

  console.log(req.body);

  try {
    if (!firstname || !lastname || !username || !email || !gender || !jobrole || !department) {
      return res.status(400).json({
        message: 'please fill required field'
      });
    }
    const findByUsername = await db.query('SELECT * FROM users WHERE username=$1 LIMIT 1', [username]);
    if (findByUsername.rows.length) {
      return res.status(400).json({
        message: 'username already exists'
      });
    }

    const findByEmail = await db.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
    if (findByEmail.rows.length) {
      return res.status(400).json({
        message: 'email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(

      'INSERT INTO users (firstname, lastname, username, profile_img, email, password, gender, jobrole, department) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [firstname, lastname, username, profile_img, email, hashedPassword, gender, jobrole, department]
    );
    const token = jwt.sign(
      { username, id: result.rows[0].id },
      SECRET, { expiresIn: '30d' }
    );
    return res.status(200).json({ message: 'user sign up successful', data: result.rows[0], token });
  } catch (error) {
    return next(error);
  }
};

const loggIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'email and password required'
      });
    }

    const findByEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    console.log(findByEmail.rows);
    if (!findByEmail.rows.length) {
      return res.status(401).json({
        message: 'invalid username or password'
      });
    }

    const hashedPassword = await bcrypt.compare(
      password, findByEmail.rows[0].password
    );

    if (hashedPassword === false) {
      return res.status(401).json({
        message: 'invalid password'
      });
    }

    const token = jwt.sign(
      { username: findByEmail.rows[0].username, id: findByEmail.rows[0].id },
      SECRET, { expiresIn: '30d' }
    );

    return res.status(200).json({ message: 'Login succesfull', data: findByEmail.rows[0], token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signUpUser, loggIn };
