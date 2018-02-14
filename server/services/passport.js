var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(new TwitterStrategy({
    consumerKey: 'XGCiMWYsKz3Lv7sku762gZ1bx',
    consumerSecret: 'vYeJo7YeIuegx8jLjKtiWNAvPBwUyAB2jaEwCC7WhRUwwTx0zO',
    callbackURL: "/auth/twitter/callback"
  },
  async(accessToken,refreshToken,profile,done)=>{
    const existingUser = await User.findOne({twitterId: profile.id});
    if(existingUser){
      return done(null,existingUser);
    }
    const user = await new User({twitterId: profile.id}).save();
    return done(null,user);
  }
));
