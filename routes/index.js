var express = require('express');
var router = express.Router();
var userModel =require('../Models/Users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function(req, res, next) {
  res.render('Add');
});
router.post('/add',function(req,res,next){
  var bodydata={
    uname: req.body.txt1,
    umobile: req.body.txt2,
    uemail: req.body.txt3,
    unpassword: req.body.txt4
  }
  var mydata = userModel(bodydata)
  mydata.save(req.body)
    .then(data =>{
      res.send("Record Added")
    })
    .catch(err => console.log("Error in Query" +err));    
})

router.get('/display', function(req,res,next){
  userModel.find()
  .then(data=>{
    console.log(data);
    res.render('Display.ejs',{mydata:data});
  })
  .catch(err=>console.log("Error" +err));
});

router.get('/show/:id', function (req,res,next){
  var myid=req.params.id;
  
  userModel.findById(myid)
  .then(data=>{
    res.render('show',{mydata:data})
  })
  .catch(err=>console.log("Error" +err))
});

router.get('/delete/:id', function(req,res,next){
  var myid=req.params.id;
  userModel.findByIdAndDelete(myid)
  .then(data=>{
    res.redirect('/display');
  }).catch(err=>console.log("Error" +err))
});

router.checkout('/edit/:id',function (req,res,next){
  var myid=req.params.id;
  res.send("ID is" +myid)
});

router.get('/edit/:id', function(req,res,next){
  var myid=req.params.id;
  userModel.findById(myid)
  .then(data=>{
    res.render('edit',{mydata:data});
  }).catch(err=>console.log("Error" +err))
});

router.post('/update/:id', function(req,res,next){
  var myid=req.params.id;
  var mydata={
    uname:req.body.txt1,
    umobile:req.body.txt2,
    uemail:req.body.txt3,
  }
  userModel.findByIdAndUpdate(myid,mydata)
  .then(data=>{
    res.redirect('/display');
  })
  .catch(err=>console.log("Error"+err))
})

module.exports = router;