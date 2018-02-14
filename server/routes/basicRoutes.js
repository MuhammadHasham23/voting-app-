const mongoose = require("mongoose");
const User = mongoose.model("users");
const Options = mongoose.model("options")
var ObjectId = require('mongodb').ObjectID;
module.exports = app =>{
  app.get('/',(req,res)=>{
      res.send(req.user);
  });
  app.post('/newpoll',(req,res)=>{
    User.find({"_id":req.user.id},(err,result)=>{
      result[0].polls.push({name: req.body.title,options: []});
      result.save();
    });
    // const options = req.body.options;
    //  const poll = {
    //    _id:"2",
    //    name: req.body.title,
    //    options: options
    //  };
    //  User.findOne({_id: req.user.id},(err,result)=>{
    //    User.findByIdAndUpdate(
    //      result,
    //      {$push: {polls:poll}},
    //      {safe:true,upsert:true},
    //      (err,model)=>{
    //        console.log(err);
    //
    //      }
    //    );
    //  });
    res.send('new poll');
  });

  app.get('/mypolls',(req,res)=>{
    User.find({_id:req.user.id},{"polls.name":1},(err,result)=>{
      res.send(result);
    });
  });

  app.post('/deletepoll',(req,res)=>{
  User.update({_id:req.user.id},{$pull:{"polls":{"_id":"1"}}},(err,result)=>{
    res.send(result);
  });
});

  app.post('/addoption',(req,res)=>{
    // User.update({_id:req.user.id},{$push: {"polls.0.options":{name:"WOW IT WORKED",count:0}}},(err,result)=>{
    //   console.log(result);
    //   res.send(result);
    //   console.log(err);
    // });

    User.find({"polls._id":"2"},(err,result)=>{
      console.log(result);
    });
    // User.find({"polls.id":"2"},{polls:{$elemMatch: {_id:"2"}}},(err,result)=>{
    //   console.log(result[0]);
    //   res.send(result[0].polls);
    // });

  });

};
