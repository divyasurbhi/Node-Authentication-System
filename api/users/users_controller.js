var dateFormat = require('dateformat');
const dotenv = require('dotenv');

dotenv.config({path: './config.env' });
const {genSaltSync,hashSync,compareSync}= require('bcryptjs');
const{createUser,getAllUsers,getUserById,updateUser,deleteUser,getUserByEmail}= require('./users_services');
const{sign}= require('jsonwebtoken');
const { body,validationResult } = require('express-validator');

module.exports={
   checkMultipart:(req, res, next)=> {
    const contentType = req.headers["content-type"];
    // Make sure it's multipart/form
    if (!contentType || !contentType.includes("multipart/form-data")) {
      var alertmsg="Content-type is not multipart";
      return res.redirect('/alert'+'/'+alertmsg);
    }
   
    next();
},



  validate : (method) => {
   switch (method) {
      case 'createUser': {
      return [ 
      //   checkBody('first_name').notEmpty().withMessage('Name field is required'),
      //  checkBody('email')
      //   .notEmpty()
      //   .withMessage('Email field is required')
      //   .isEmail()
      //   .withMessage('Enter a valid email address')
      //   .isEmailExists()
      //   .withMessage('Email address already exists'),

      //   checkBody('password').notEmpty().withMessage('Password field is required'),
      //  checkBody('passwordConfirm').notEmpty().withMessage('Retyp password field is required'),

      //   checkBody('password').isEqual(req.body.passwordConfirm).withMessage('Password and confirm password did not match.'),

      //   checkBody('event').notEmpty().withMessage('Event field is required'),

      // asyncValidationErrors().then(function() {
      //       next();
      //   }).catch(function(errors) {
      //       console.log("Validation Errors"+errors);
      //   })

          body('first_name', 'Name is required').exists(),
          body('gender', 'Gender is required').exists(),
          body('email', 'Invalid email').exists().isEmail(),
          body('phoneNumber','Invalid Phone Number').exists().isInt().isLength({min:10, max: 10 }),
          body('event','Event is required').exists(),
          body('duration','Event Duration is required').exists(),
          body('dob','Your birth date is required').exists(),
          body ('passwordConfirm', 'Please confirm the Password you have entered').exists(),
          body ('passwordConfirm', 'Password should contain at least 6 characters').isLength({ min: 6 }),
          body ('password', 'Password is requried').exists(),
          body ('password', 'Password should contain at least 6 characters').isLength({ min: 6 }),
          //  body('password').custom((val, { req, loc, path }) => {
             
          //       if (val != req.body.passwordConfirm) {
          //         console.log(req.body.passwordConfirm);
          //           throw new Error("Passwords do not match");
          //       }
          //     })
         ]   
      }
    }
  },

  createUser : (req, res)=>{
    // upload(req, res, function (err) {
    //   if (err instanceof multer.MulterError) {
    //     console.log("MultiError occured when uploading");
     
    //   }
    // });
    console.log(req.body);
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        console.log(errors);
        var alertmsg="Error in Form Validation";
        return res.redirect('/alert'+'/'+alertmsg);
      }
  const body= req.body;
  const salt= genSaltSync(4);
  body.password= hashSync(body.password,salt);
  createUser(body,(error,result)=>{
if(error)
{
  var alertmsg= "Database Connection Error";
  return res.redirect('/alert'+'/'+alertmsg);
}
else{
 var alertmsg="Form Submitted Successfully";
  return res.redirect('/alert'+'/'+alertmsg);
}
  });
  
  
},


getAllUsers :(req,res)=>{
  
  getAllUsers((error,result)=>{
    if(error){
      console.log(error);
      return;
    }
    if(!result){
      res.json({
        success:0,
        message:"Record Not Found"
      });
    }
    return res.json({
      success:1,
      message:result
    });
  });
  },

  updateUser :(req,res)=>{
    const body= req.body;
    updateUser(body,(error,result)=>{
      if(error){
        console.log(error);
        var alertmsg="Some error occured while updation";
        return res.redirect('/alert'+'/'+alertmsg);
   
      }
      if(!result){
        var alertmsg="Updation Failed";
        return res.redirect('/alert'+'/'+alertmsg);
      }
      var alertmsg="User Updated Successfully";
      return res.redirect('/alert'+'/'+alertmsg);
    });
    },
  
    deleteUser :(req,res)=>{
      const data= req.body;
      deleteUser(data,(error,result)=>{
        if(error){
          console.log(error);
          var alertmsg="Some error occured while deletion";
          return res.redirect('/alert'+'/'+alertmsg);
        }
        if(!result){
          var alertmsg="Failed to delete the user";
          return res.redirect('/alert'+'/'+alertmsg);
        }
        var alertmsg="User deleted successfully";
       return res.redirect('/alert'+'/'+alertmsg);
      });
      },

      userLogin :(req,res)=>{
        const body= req.body;
        getUserByEmail(body.email,(error,result)=>{
         
          if(error){
          //console.log(error);
          var alertmsg="Some error occured while login";
          return res.redirect('/alert'+'/'+alertmsg);
            
          }
          if(!result){
            var alertmsg="Invalid email or password";
            return res.redirect('/alert'+'/'+alertmsg);
          }
         
          const _result= compareSync(body.password,result[0].Password);
          if(_result){
            result.password=undefined;
            const jsontoken = sign({_result:result}, process.env.key,{
               expiresIn: "1h"
            });
            
            localStorage.setItem('jsontoken', jsontoken);
           
            var id = result[0].Id;
   
            getUserById(id,(error,userinfo)=>{
                            
              if(error){
                console.log(error);
                return;
              }
              if(!userinfo){
                var alertmsg="No record Found";
               return res.redirect('/alert'+'/'+alertmsg);
              }
              
              var dob= dateFormat(userinfo.DOB, "dd-mm-yyyy");
              
              
           return res.redirect('/profile'+'/'+userinfo.FirstName+'/'+userinfo.LastName+'/'+userinfo.Email+'/'+userinfo.Gender+'/'+userinfo.PhoneNumber+'/'+dob+'/'+id+'/'+userinfo.Photo);
       
      });
        
          }
    else{
      var alertmsg="Invalid email or password";
      return res.redirect('/alert'+'/'+alertmsg);
        }
      
        });
      }
      
};
