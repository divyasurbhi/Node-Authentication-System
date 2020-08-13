const {verify}=  require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config.env' });

module.exports={

    verifyToken: (req,res,next)=>{
 let token= req.get("authorization");
 if(token){
//Remove the bearer
token= token.slice(7);
verify(token,process.env.key,(err,decoded)=>{
    if(err){
        res.json({
            success:0,
            message:"Invalid Token"
        });   
    }
    else{
        next();
    }
})
 }
 else{
     res.json({
         success:0,
         message:"Access Denied! Unauthorized User"
     });
 }
}
};