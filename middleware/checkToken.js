const jwt = require('jsonwebtoken');

require('dotenv').config();

const SECRET = process.env.JWT_SECRET_CODE;

const checkToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1] || req.token;
      const decodedtoken = jwt.verify(token, SECRET);
      return next();
    }
    return res.status(401).json({
      message: 'Unauthorized'
    });
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

module.exports = checkToken;