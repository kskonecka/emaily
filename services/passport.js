const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //thats Model Class

passport.serializeUser((user, done) => {
  done(null, user.id); // null - no error, all went fine; user.id - identyfying piece of information, that is going to identify the user in follow up requests
  // obs! user.id is not google profile.id (look in mongoDB). cause what if you sign with FB and not google - no google id. with user.id something is always there
  // OAuth's only purpose is to allow smeone to sign in. after that, we use our own internal IDs
});

passport.deserializeUser((id, done) => {
  //function we write to turn user id into a user
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // (accessToken, refreshToken, profile, done) => { // this fn has some async code
    //   // console.log('accessToken: ', accessToken);
    //   // console.log('refreshToken: ', refreshToken);
    //   // console.log('profile: ', profile);
    //   User.findOne({ googleID: profile.id }) //look throught user collection, find the first record inside that collection. it returns a promise
    //     .then(existingUser => {
    //       // existingUser is a Model instance of user
    //       if (existingUser) {
    //         // we already have a record of that profile id
    //         done(null, existingUser); // null: no error there , everything went fine;
    //       } else {
    //         //we dont have the user record.  make a new one
    //         new User({ googleID: profile.id })
    //           .save()
    //           .then(user => done(null, user));
    //       }
    //     });
    // }
    async (accessToken, refreshToken, profile, done) => { // this fn has some async code
      const existingUser = await User.findOne({ googleID: profile.id })

      if (existingUser) {
        return done(null, existingUser);
      }
      
      const user = await new User({ googleID: profile.id }).save()
      done(null, user)

    }
  )
);
