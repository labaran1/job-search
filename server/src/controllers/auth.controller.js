const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide name',
    });
  }

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide email',
    });
  }

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide password',
    });
  }

  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    success: true,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide email',
    });
  }

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide password',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Invalid credentials',
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Invalid credentials',
    });
  }

  const token = user.generateToken();
  res.cookie('token', token, {
    httpOnly: true,
  });

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(StatusCodes.OK).json({ success: true });
};
