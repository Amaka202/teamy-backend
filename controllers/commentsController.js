const db = require('../db/db');

const postComments = async (req, res, next) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const { id: userId } = req.user;

  try {
    console.log(req.body);
    if (!comment) {
      return res.status(401).json({
        status: 'error',
        message: 'Comment required'
      });
    }

    const comments = await db.query(
      'INSERT INTO comments (comment, post_id, commenter_id) VALUES ($1, $2, $3)',
      [comment, postId, userId]
    );

    return res.status(200).json({
      status: 'success',
      message: 'article comment fetched successfully',
      data: comments.rows
    });
  } catch (error) {
    return next(error);
  }
};

const getComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await db.query(
      `SELECT comments.comment, comments.createdat, users.firstname, users.lastname, users.profile_img
      FROM comments
      INNER JOIN users
      ON comments.commenter_id = users.id
      WHERE post_id=$1
      ORDER BY comments.createdat DESC`,
      [postId]
    );

    return res.status(200).json({
      status: 'success',
      message: 'article comment fetched successfully',
      data: comments.rows
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { postComments, getComments };
