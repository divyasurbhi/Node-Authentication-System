
const {genSaltSync,hashSync}= require('bcryptjs');
const{createUser,getAllUsers,getUserById,updateUser,deleteUser}= require('./users_services');

module.exports.createUser = (req, res)=>{
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
}



