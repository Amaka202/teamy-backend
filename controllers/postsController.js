/* eslint-disable camelcase */
const db = require('../db/db');

const getPosts = async (req, res, next) => {
  try {
    const result = await db.query(`
    SELECT users.firstname, users.id, users.lastname, users.jobrole, users.profile_img, posts.id, posts.title, posts.article, posts.user_id, posts.isEdited, posts.gif, posts.createdat,
    (SELECT count(*) FROM comments WHERE post_id = posts.id) AS comment_count
    FROM users
    INNER JOIN posts
    ON posts.user_id = users.id
    ORDER BY posts.createdat DESC`);
    console.log(result);
    return res.status(200).json({ message: 'fetched all posts successfully', data: result.rows });
  } catch (error) {
    return next(error);
  }
};

const createPost = async (req, res, next) => {
  const { id: userId } = req.user;
  const { title, article, gif } = req.body;

  try {
    if (!((title && article) || (title && gif))) {
      return res.status(400).json({
        status: 'error',
        error: !(title && article) ? 'Title and article required' : 'Title and gif required'
      });
    }

    const result = await db.query(
      'INSERT INTO posts (title, article, user_id, gif, isEdited) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, article, userId, gif, false]
    );
    console.log(result);
    return res.status(200).json({
      status: 'success',
      message: 'Post successfully posted',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

const editArticle = async (req, res, next) => {
  const { id: userId } = req.user;
  const { article, title } = req.body;
  const { postId } = req.params;
  try {
    // fetch the article
    // get the user id from the article fetched
    if (!(postId)) {
      return res.status(401).json({
        status: 'error',
        message: 'Post id needed'
      });
    }
    const post = await db.query(
      'SELECT * FROM posts WHERE id=$1', [postId]
    );
    if (post.rows[0] && post.rows[0].user_id !== userId) {
      return res.status(401).json({
        staus: 'error',
        message: 'Unauthorized',
      });
    }

    // const articleToUpdate = article || post.rows[0].article;
    // const titleToUpdate = title || post.rows[0].title;
    if (article === post.rows[0].article && title === post.rows[0].title) {
      return res.status(200).json({
        status: 'success',
        message: 'no changes made',
        article,
        title
      });
    }

    const result = await db.query(
      'UPDATE posts SET title=$1, article=$2, isEdited=$3 WHERE id=$4 RETURNING *',
      [title, article, true, postId]
    );
    return res.status(200).json({
      status: 'success',
      message: 'post successfully updated',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { id: userId } = req.user;
  const { postId } = req.params;
  try {
    // fetch the article
    // get the user id from the aticle fetched
    if (!(postId)) {
      return res.status(401).json({
        staus: 'error',
        message: 'Post id needed'
      });
    }
    const post = await db.query(
      'SELECT user_id FROM posts WHERE id=$1', [postId]
    );
    if (post.rows[0] && post.rows[0].user_id !== userId) {
      return res.status(401).json({
        staus: 'error',
        message: 'Unauthorized',
      });
    }
    const result = await db.query(
      'DELETE FROM posts WHERE id=$1', [postId]
    );
    return res.status(200).json({
      status: 'success',
      message: 'post successfully deleted',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPosts, createPost, editArticle, deletePost
};
