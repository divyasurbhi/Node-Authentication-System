const router = require('express').Router();
const {createUser,getAllUsers,getUserById,updateUser,deleteUser,userLogin}= require('./users_controller');
const {verifyToken}= require('../../auth/token_validation');

router.post('/',createUser);
router.get('/',verifyToken,getAllUsers);
router.get('/:id',verifyToken,getUserById);
router.patch('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser); 
 router.post('/login',userLogin) ;
  
 module.exports = router;