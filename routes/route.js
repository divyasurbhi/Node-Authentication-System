const router = require('express').Router();
var path= require('path');


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/register.html'));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname+'/login.html'));
});

router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname+'/profile.html'));
});
  
  
  module.exports = router;