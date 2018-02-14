const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport =require("passport");
const bodyParser = require('body-parser');
require("./models/User");
require("./services/passport");

mongoose.connect("mongodb://admin:admin@ds233208.mlab.com:33208/votingapp")
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["key"]
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/basicRoutes')(app);

app.listen(process.env.PORT || 5000,()=>{
  console.log('server running on 5000');
});
