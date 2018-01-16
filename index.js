// not this one:
// import express from 'express' because at the time Node JS had no support for ES2015 modules
// on the react side of things we will use import express from 'express'
// down: common js modules
const express = require('express');
const app = express();

// app is the express server
app.get('/', (req, res) => {
  res.send({ hello: 'world'});
});

const PORT = process.env.PORT || 5000
app.listen(PORT);
