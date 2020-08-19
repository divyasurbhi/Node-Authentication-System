const express = require('express');
const multer= require('multer');

const dotenv = require('dotenv');
dotenv.config({path: './config.env' });
const bodyParser= require('body-parser');

const app= express();
var expressValidator= require('express-validator');
const hbs = require('hbs');
const userRouter= require('./api/users/users_route');
const Router= require('./route');
const PORT = process.env.PORT || 5000;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//parse url-encoded bodies(as sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse json bodies as sent by api client into javascript objects
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/views/public'));
app.set('view engine', 'hbs');
app.use('/api/users',userRouter );
app.use('/',Router);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});



