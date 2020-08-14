const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env' })
const bodyPaser= require('body-parser');
const app= express();
const userRouter= require('./api/users/users_route');
const Router= require('./route');
const PORT = process.env.PORT || 5003;

//parse url-encoded bodies(as sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse json bodies as sent by api client into javascript objects
app.use(express.json());
//bodyParser.urlencoded({ extended: true });
app.use(express.static(__dirname + '/public'));
app.use('/api/users',userRouter );
app.use('/',Router);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


