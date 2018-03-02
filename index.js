
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); //pulls user id out of cookie data
const keys = require('./config/keys');
require('./models/User'); //this has to go first
require('./services/passport');  //this has to go second

mongoose.connect(keys.mongoURI)

const app = express();

app.use(
  cookieSession({                     // this extracts cookie data
    maxAge: 30 * 24 * 60 * 60 * 1000, //how long this cookie exists in the browser untill is expired, we want 30 days in miliseconds
    keys: [keys.cookieKey] //this will be used to encrypt our cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //instead of: require('./routes/authRoutes');

const PORT = process.env.PORT || 5000
app.listen(PORT);
