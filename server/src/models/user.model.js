const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide name'],
    },
    email: {
      type: String,
      required: [true, 'please provied email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please provide password'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.method('generateToken', function () {
  const secret = process.env.JwtSecret;
  const token = jwt.sign({ userId: this._id }, secret, { expiresIn: '3d' });
  return token;
});

userSchema.method('comparePassword', async function (password) {
  return await bcrypt.compare(password, this.password);
});

module.exports = mongoose.model('user', userSchema);
