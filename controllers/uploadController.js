const cloudinary = require('cloudinary').v2;

const uploadFile = async (req, res, next) => {
  const { gif } = req.files;
  try {
    if (!gif) {
      return res.status(400).json({
        message: 'file is needed'
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(gif.tempFilePath,
      { resource_type: 'auto' });

    if (uploadResponse) {
      return res.status(200).json({
        message: 'Image uploaded successfully',
        result: uploadResponse.secure_url
      });
    }

    return res.status(400).json({
      message: 'an error occured'
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = uploadFile;