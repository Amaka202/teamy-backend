const db = require('../db/db');

const postComments = async (req, res, next) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    if (!comment) {
      return res.status(401).json({
        status: 'error',
        message: 'Comment required'
      });
    }

    await db.query(
      'INSERT INTO comments (comment, post_id) VALUES ($1, $2)',
      [comment, postId]
    );

    const post = await db.query(
      'SELECT * FROM posts WHERE id=$1',
      [postId]
    );

    const comments = await db.query(
      'SELECT * FROM comments WHERE post_id=$1',
      [postId]
    );

    post.rows[0].comments = comments.rows;

    return res.status(200).json({
      status: 'success',
      message: 'article comment fetched successfully',
      data: post.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = postComments;