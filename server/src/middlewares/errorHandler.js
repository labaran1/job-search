const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something broke',
  };

  res.status(customErr.statusCode).json({
    msg: customErr.msg,
  });
};

module.exports = errorHandler;
