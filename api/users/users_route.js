const router = require('express').Router();
const {checkMultipart,validate, createUser,getAllUsers,updateUser,deleteUser,userLogin}= require('./users_controller');
const {requireLogin}= require('../../auth/token_validation');
var path=require('path');

// const multer= require('multer');
// var diskStorage = multer.diskStorage({

//   destination:function(req,file,cb){

//      cb(null,'/public/images');
//   },
//   filename:function(req,file,cb){
//      var ext = path.extname(file.originalname);
//       var file_name = file.originalname+"_"+Date.now()+ext;
    
//       cb(null,file_name);
//   }
// });
// const upload = multer({storage:diskStorage,fileFilter: (req, file, cb) => {
//   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//   }
// }}).single('photo');


//router.post('/',checkMultipart,upload,validate,createUser);

router.post('/',validate('createUser'),createUser);
router.get('/',requireLogin,getAllUsers);
router.post('/update/',requireLogin,updateUser);
router.post('/delete',requireLogin,deleteUser); 
 router.post('/login',userLogin) ;
 
 module.exports = router;