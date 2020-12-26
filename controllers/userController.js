const db = require('../db/db');

const getUser = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM users');
    return res.status(200).json({ message: 'fetched all users successfully', data: result.rows });
  } catch (error) {
    return next(error);
  }
};

module.exports = getUser;
