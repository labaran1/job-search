const mongoose = require('mongoose');

const dbConnect = (dbURI) => {
  return mongoose.connect(dbURI);
};

module.exports = dbConnect;
