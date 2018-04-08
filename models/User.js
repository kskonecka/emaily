const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // same thing as below
const { Schema } = mongoose;       // it means: the mongoose objects has a property called Schema.
                                   // take that property and assign it to a new variable called Schema

const userSchema = new Schema({
  googleID: String,
  // name: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // first argument is the name of mongoDB collection
