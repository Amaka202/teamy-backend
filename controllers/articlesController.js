/* eslint-disable camelcase */
const db = require('../db/db');

const getArticles = async (req, res, next) => {
  try {
    const result = await db.query(`
    SELECT firstname, lastname, jobrole, profile_img, articles.title, article
    FROM users
    INNER JOIN articles 
    ON articles.user_id = users.id
    ORDER BY articles.createdAt`);
    return res.status(200).json({ message: 'fetched all articles successfully', data: result.rows });
  } catch (error) {
    return next(error);
  }
};

const postArticles = async (req, res, next) => {
  const { title, article } = req.body;
  try {
    if (!title || !article) {
      return res.status(400).json({
        status: 'error',
        error: 'All fields required'
      });
    }

    const result = await db.query(
      'INSERT INTO articles (title, article) VALUES ($1,$2) RETURNING *',
      [title, article]
    );
    return res.status(200).json({
      status: 'success',
      message: 'Article successfully posted',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

const editArticle = async (req, res, next) => {
  const { title, article } = req.body;
  try {
    if (!title || !article) {
      return res.status(400).json({
        status: 'error',
        error: 'All fields required'
      });
    }

    const result = await db.query(
      'UPDATE articles SET title=$1, article=$2 WHERE id=$3 RETURNING *',
      [title, article, req.params.id]
    );
    return res.status(200).json({
      status: 'success',
      message: 'Article successfully updated',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const result = await db.query(
      'DELETE FROM articles WHERE id=$1', [req.params.id]
    );
    return res.status(200).json({
      status: 'success',
      message: 'article successfully deleted',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getArticles, postArticles, editArticle, deleteArticle
};
