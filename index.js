const express = require('express');
const mysql = require('./config/database');
const dotenv = require('dotenv');
const bodyPaser= require('body-parser');
const userRouter= require('./api/users/users_route');
const Router= require('./routes/route');
var path= require('path')
const app= express();
dotenv.config({path: './config.env' })

const PORT = process.env.PORT || 4000;
app.use(express.static(__dirname + '/public'));
app.use('/api/users',userRouter );
app.use('/',Router);
//parse url-encoded bodies(as sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse json bodies as sent by api client into javascript objects
app.use(express.json());
//const authRoute= require('./api/routes/auth');



app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


//---------------------Define Routes--------------------------------------



// app.get("/", (req, res) => {
//   res.render()
//   res.sendFile('register.html',{ root: __dirname })
// });

// app.get("/login", (req, res) => {
//   res.sendFile('login.html',{ root: __dirname })
// });

// app.get("/profile", (req, res) => {
//   res.sendFile('profile.html',{ root: __dirname })
// });

//---------------------------------------Routes Ended-----------------------------
