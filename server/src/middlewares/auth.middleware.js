const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  const secret = process.env.JwtSecret;

  try {
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: 'Token expired / Invalid Token',
      });
    }

    const payload = jwt.verify(token, secret);

    req.userId = payload.userId;
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Invalid Token',
    });
  }
  next();
};

module.exports = AuthMiddleware;
