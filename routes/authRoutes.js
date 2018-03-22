// not this one:
// import express from 'express' because at the time Node JS had no support for ES2015 modules
// on the react side of things we will use import express from 'express'
// down: common js modules

// app is the express server
// app.get('/', (req, res) => {
//   res.send({ hello: 'is it me youre looking for?'});
// });
const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //logout() is autmatically attached to the req object by passport
    // res.send(req.user); //something that will say undefined,/ no content/ or nothing at all
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    // res.send(req.session)
    res.send(req.user);
  });
};
