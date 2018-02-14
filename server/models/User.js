const mongoose = require("mongoose");
const {Schema} = mongoose;
const polls = require('./Polls');
const User = new mongoose.Schema({
  twitterId: String,
  polls:[{
    type: Schema.Types.ObjectId,
    ref: 'polls'
  }]
});

mongoose.model("users",User);
