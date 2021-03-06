const express = require('express');
const morgan = require('morgan');
// deprecated const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import routers
const postRoutes = require('./routes/post');

// app
const app = express();

// database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

//middleware
app.use(cors());
app.use(morgan('dev'));
// Body parser
app.use(express.json());

// route middleware
app.use('/api', postRoutes);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
