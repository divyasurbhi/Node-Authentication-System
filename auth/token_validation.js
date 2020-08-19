const {verify}=  require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config.env' });

module.exports={

    requireLogin : (req, res, next)=> {
     var jsontoken= localStorage.getItem('jsontoken');
     console.log("jsontoken"+" "+jsontoken);
      try {
        if(jsontoken)
        {
        verify(jsontoken, process.env.key);
        next();
      }
      else{
        var alertmsg="Access Denied! Invalid Token";
        return res.redirect('/alert'+'/'+alertmsg); 
      }
      } catch(err) {
           var alertmsg="Access Denied! Unauthorized User";
            return res.redirect('/alert'+'/'+alertmsg);
      }

      
        
      }

};