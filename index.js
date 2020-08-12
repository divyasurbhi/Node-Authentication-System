const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyPaser= require('body-parser');
var path= require('path')
const app= express();
dotenv.config({path: './config.env' })
app.set('view engine', 'ht'); 
const PORT = process.env.PORT || 4000;
//const authRoute= require('./api/routes/auth');






var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database : process.env.DB_NAME
});

connection.connect(function(err) {
  if(err)
	console.log(err);
	else
	console.log("SQL Server Connected");
});
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


//---------------------Define Routes--------------------------------------
app.use(express.static(__dirname + '/public'));
//app.use('/', require('./routes/route'));
//app.use('/api/user',authRoute);
app.get("/", (req, res) => {
  res.render()
  res.sendFile('register.html',{ root: __dirname })
});

app.get("/login", (req, res) => {
  res.sendFile('login.html',{ root: __dirname })
});

app.get("/profile", (req, res) => {
  res.sendFile('profile.html',{ root: __dirname })
});
app.post("/", (req, res) => {
  res.sendFile('register.html',{ root: __dirname })
});
app.post("/login", (req, res) => {
  res.sendFile('login.html',{ root: __dirname })
});
app.post("/profile", (req, res) => {
  res.sendFile('profile.html',{ root: __dirname })
});
//---------------------------------------Routes Ended-----------------------------