const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./src/config/db.config');
const errorHandler = require('./src/middlewares/errorHandler');
require('express-async-errors');
require('dotenv').config();

//routes imports
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const port = process.env.port || process.env.PORT;
const dbURI = process.env.dbURI;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome To Job Search APIs');
});

// routes
app.use('/api/auth', authRoutes);

//custom middlewares
app.use(errorHandler);

const start = async () => {
  await dbConnect(dbURI);
  console.log('Database Connected...');
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

start();
