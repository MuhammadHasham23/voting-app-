const mongoose = require("mongoose");
const {Schema} = mongoose;
var ObjectId = require('mongodb').ObjectID;
const User = new Schema({
  twitterId: String,
  polls:[{
    name: String,
    options: [{name:String,count:Number}]
  }]
});

mongoose.model("users",User);
