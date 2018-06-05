
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //its a middleware that needs to be wired with express by app.use
const passport = require('passport'); //pulls user id out of cookie data
const bodyParser = require('body-parser'); //its a middleware that needs to be wired with express by app.use
const keys = require('./config/keys');
require('./models/User'); //this has to go first
require('./models/Survey');
require('./services/passport');  //this has to go second

mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({                     // this extracts cookie data
    maxAge: 30 * 24 * 60 * 60 * 1000, //how long this cookie exists in the browser untill is expired, we want 30 days in miliseconds
    keys: [keys.cookieKey] //this will be used to encrypt our cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //instead of: require('./routes/authRoutes');
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up prod assets like main.js or main.css
  app.use(express.static('client/build'))

  // express will serve up the index.html file if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);
