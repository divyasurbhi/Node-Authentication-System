const router = require('express').Router();
const {createUser}= require('./users_controller');

router.post('/',createUser);


  
  
  module.exports = router;