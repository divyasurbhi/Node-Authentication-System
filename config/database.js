const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env' })

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

module.exports = connection;
