const db = require('../db/db');

const postArticleComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.query(
      'INSERT INTO comments (comment, article_id) VALUES ($1, $2)',
      [req.body.comment, id]
    );

    const article = await db.query(
      'SELECT * FROM articles WHERE id=$1',
      [id]
    );

    const comments = await db.query(
      'SELECT * FROM comments WHERE articles_id=$1',
      [id]
    );

    article.rows[0].comments = comments.rows;
    return res.status(200).json({
      status: 'success',
      message: 'article comment fetched successfully',
      data: article.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

const postGifComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.query(
      'INSERT INTO comments (comment, gif_id) VALUES ($1, $2)',
      [req.body.comment, id]
    );

    const gif = await db.query(
      'SELECT * FROM gifs WHERE id=$1',
      [id]
    );

    const comments = await db.query(
      'SELECT * FROM comments WHERE gif_id=$1',
      [id]
    );

    gif.rows[0].comments = comments.rows;
    return res.status(200).json({
      status: 'success',
      message: 'gif comment fetched successfully',
      data: gif.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postArticleComments, postGifComments
};