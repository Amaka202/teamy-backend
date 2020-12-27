const db = require('../db/db');
const { cloudinary } = require('../utils/cloudinary');

const postGif = async (req, res, next) => {
  const { title, gif } = req.body;
  try {
    if (!title || !gif) {
      return res.status(400).json({
        status: 'error',
        error: 'All fields required'
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(gif, {
      upload_preset: 'dev_setups',
    });

    const gifurl = uploadResponse.url;

    const result = await db.query(
      'INSERT INTO gifs (title, gifurl) VALUES ($1,$2) RETURNING *',
      [title, gifurl]
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

const deleteGif = async (req, res, next) => {
  try {
    const result = await db.query(
      'DELETE FROM articles WHERE id=$1', [req.params.id]
    );
    return res.status(200).json({
      status: 'success',
      message: 'gif successfully deleted',
      data: result.rows[0]
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postGif, deleteGif
};