const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //thats Model Class

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken: ', accessToken);
    // console.log('refreshToken: ', refreshToken);
    // console.log('profile: ', profile);
    User.findOne({ googleID: profile.id }) //look throught user collection, find the first record inside that collection. it returns a promise
      .then((existingUser) => { // existingUser is a Model instance of user
        if (existingUser) {
          // we already have a record of that profile id
          done(null, existingUser); // null: no error there , everything went fine;
        } else {
          //we dont have the user record.  make a new one
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      })

  })
);
