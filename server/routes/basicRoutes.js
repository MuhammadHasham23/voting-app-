const mongoose = require("mongoose");
const User = mongoose.model("users");

var ObjectId = require('mongodb').ObjectID;

module.exports = app =>{
  app.get("/",(req,res)=>{
    res.send("Authenticated");
  });
  app.get('/results',(req,res)=>{
    User.find({},(error,result)=> res.send(result));
  });
  app.get('/verifyuser',(req,res)=>{
    if(req.user) res.send(true);
    else res.send(false);
  });
  app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/');
  });
  app.post('/newpoll',(req,res)=>{

    const options = req.body.poll.options;
    const arr = options.map((option)=>{
      return {name: option,count:0}
    });
     const poll = {
       name: req.body.poll.title,
       options: arr
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
    User.update({"polls._id":req.body.pollId},{ $push: { "polls.0.options": {"name": req.body.newoption,count: 0} } },(err,result)=>{
      res.send(result)
    });
  });

  app.post('/pollinfo',(req,res)=>{
    User.find({},(err,result)=>{
      const arr = result[0].polls.map((option)=>{
        if(option._id == req.body.pollId){ //make it work right.
          return option;
        }
      });
      res.send(arr);
    });
  });

  app.post("/updatecount",(req,res)=>{
    console.log(req.body.counter);
      User.update({"polls._id":req.body.pollId},{ '$inc':{[`polls.$.options.${req.body.counter}.count`]:1}},(error,resultant)=>{
        res.send(resultant);
      });
  });

  app.post("/getoptions",(req,res)=>{
    User.find({},(err,result)=>{
      const arr = result[0].polls.map((option)=>{
        if(option._id == req.body.pollId){ //make it work right.
          return option;
        }
      });
      const newarr = arr.filter(Boolean);
      res.send(newarr[0].options)
    });
  });
};
