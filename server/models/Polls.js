const mongoose = require("mongoose");
const {Schema} = mongoose;
const option = require('./Options');
const PollsSchema = new mongoose.Schema({
  polls:{
    _id: String,
    name: String,
    options:[{
    type: Schema.Types.ObjectId,
    ref: 'options'
  }]
  }
});

const Polls = mongoose.model("polls",PollsSchema);
module.exports = Polls;
