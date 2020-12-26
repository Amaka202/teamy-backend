const db = require('../db/db');

const getArticles = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM articles');
    return res.status(200).json({ message: 'fetched all articles successfully', data: result.rows });
  } catch (error) {
    return next(error);
  }
};

module.exports = getArticles;
