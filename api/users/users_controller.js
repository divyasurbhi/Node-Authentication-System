const dotenv = require('dotenv');
dotenv.config({path: './config.env' });
const {genSaltSync,hashSync,compareSync}= require('bcryptjs');
const{createUser,getAllUsers,getUserById,updateUser,deleteUser,getUserByEmail}= require('./users_services');
const{sign}= require('jsonwebtoken');
module.exports={
  
  createUser : (req, res)=>{
  console.log(req.body);
  const body= req.body;
  const salt= genSaltSync(10);
  body.password= hashSync(body.password,salt);
  createUser(body,(error,result)=>{
if(error)
{
  console.log(error);
  return res.status(500).json({
    success:0,
    message:'Database Connection Error'
  });
}
return res.status(200).json({
  success:0,
  data:result
});
  });
  
  res.send("Form Submitted");
},

getUserById :(req,res)=>{
const id= req.params.id;
getUserById(id,(error,result)=>{
  if(error){
    console.log(error);
    return;
  }
  if(!result){
    return res.json({
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
    const salt =genSaltSync(10);
    body.password= hashSync(body.password,salt);
    updateUser(body,(error,result)=>{
      if(error){
        console.log(error);
        return;
      }
      if(!result){
       return res.json({
          success:0,
          message:"Failed to update user"
        });
      }
      return res.json({
        success:1,
        message:"User Updated Successfully"
      });
    });
    },
  
    deleteUser :(req,res)=>{
      const data= req.body;
      deleteUser(data,(error,result)=>{
        if(error){
          console.log(error);
          return;
        }
        if(!result){
       return res.json({
            success:0,
            message:"Failed to delete user"
          });
        }
        return res.json({
          success:1,
          message:"User deleted Successfully"
        });
      });
      },

      userLogin :(req,res)=>{
        const body= req.body;
        getUserByEmail(body.email,(error,result)=>{
          if(error){
            console.log(error);
            return;
          }
          if(!result){
         return res.json({
              success:0,
              message:"Invalid email or password1"
            });
          }
          const _result= compareSync(body.password,result.password);
          if(_result){
            result.password=undefined;
            const jsontoken = sign({_result:result}, process.env.key,{
               expiresIn: "1h"
            });
       
          return res.json({
            success:1,
            message:"Login Successfully",
            token:jsontoken
          });
        }
        else{
          return res.json({
            success:0,
            message:"Invalid email or password2"
          }); 
        }
        });
        }

};
