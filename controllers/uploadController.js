const cloudinary = require('cloudinary').v2;

const uploadFile = async (req, res, next) => {
  console.log({ req });
  const { File } = req.files;
  try {
    if (!File) {
      return res.status(400).json({
        status: 'error',
        message: 'file not found'
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(myFile.tempFilePath,
      { resource_type: 'auto' });

    if (uploadResponse) {
      return res.status(200).json({
        status: 'success',
        message: 'Image uploaded successfully',
        result: uploadResponse.secure_url
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'an error occured'
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = uploadFile;