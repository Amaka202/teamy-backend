const db = require('../db/db');

const getUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const result = await db.query('SELECT * FROM users WHERE id=$1', [userId]);
    return res.status(200).json({ status: 'success', message: 'fetched the user successfully', data: result.rows });
  } catch (error) {
    return next(error);
  }
};

module.exports = getUser;