const mongoose = require("mongoose");
const User = mongoose.model("users");

var ObjectId = require('mongodb').ObjectID;

module.exports = app =>{
  app.get('/results',(req,res)=>{
    User.find({},(error,result)=> res.send(result));
  });

  app.post('/newpoll',(req,res)=>{
    const options = req.body.options;
     const poll = {
       name: req.body.title,
       options: options
     };
     User.findOne({_id: req.user.id},(err,result)=>{
       User.findByIdAndUpdate(
         result,
         {$push: {polls:poll}},
         {safe:true,upsert:true},
         (err,model)=>{
           console.log(err);

         }
       );
     });
    res.send(req.user.id);
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
    User.update({"polls._id":"5a846d9e71094c2cac949b74"},{ $push: { "polls.0.options": {"name": "what do you like",count: 0} } },(err,result)=>{
      res.send(result)
    });
  });
};
