const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: true}));

const connectDB = async () => {
  const go = await mongoose.
    connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => {
      console.log('MongoDB connecting...');
    });

}
connectDB();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600*60*24
  }
}));

// ignore favicon.ico
app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  next();

});



app.use('/user', require('./route/user.js'));
app.use('/comments', require('./route/index.js'));

const PORT = process.env.PORT || 3222;

app.listen(PORT, () => console.log(PORT));