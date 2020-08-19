const router = require('express').Router();



router.get("/", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/profile/:FirstName/:LastName/:Email/:Gender/:PhoneNumber/:DOB/:id/:photo", (req, res) => {
  var firstName = req.params.FirstName;
var lastName= req.params.LastName;
var email= req.params.Email;
var gender = req.params.Gender;
var dob= req.params.DOB;
var phoneNumber= req.params.PhoneNumber;
var id= req.params.id;
var photo = req.params.photo;

  
res.render("profile",{firstName:firstName,lastName:lastName,gender:gender,email:email,phoneNumber:phoneNumber,dob:dob,id:id ,photo:photo});

});

router.get("/alert/:alertmsg", (req, res) => {
  var alertmsg = req.params.alertmsg;
  res.render("alertMsgs",{alertmsg:alertmsg});
});

router.get("/logout", (req, res) => {
  localStorage.removeItem('jsontoken');
  var alertmsg = "You are logged out";
  res.render("alertMsgs",{alertmsg:alertmsg});
});
  module.exports = router;