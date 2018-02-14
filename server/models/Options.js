const mongoose = require("mongoose");
const {Schema} = mongoose;

const OptionsSchema = new mongoose.Schema({
    options: {name:String,count:0}
});

const opt = mongoose.model("options",OptionsSchema);
module.exports = opt;
