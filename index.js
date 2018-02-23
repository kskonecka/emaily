
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); //this has to go first
require('./services/passport');  //this has to go second

mongoose.connect(keys.mongoURI)

const app = express();

require('./routes/authRoutes')(app); //instead of: require('./routes/authRoutes');

const PORT = process.env.PORT || 5000
app.listen(PORT);
