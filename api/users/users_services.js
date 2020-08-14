const db= require('../../config/database');
var dateFormat = require('dateformat');
module.exports={

    createUser:(data,callback)=>{
        var dob= dateFormat(data.dob, "isoDate");
    db.query(
        `insert into userDetails(FirstName,LastName,Gender,DOB,Email,Password,Event, Duration,PhoneNumber)
        values(?,?,?,?,?,?,?,?,?)`,
    [
data.first_name,
data.last_name,
data.gender,
dob,
data.email,
data.password,
data.event,
data.duration,
data.phoneNumber
],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    return callback(null,result);
}   
    );
},

getAllUsers: callback=>{
    db.query(`Select * from userDetails`,

[],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    return callback(null,result);
} 
);
},

getUserById:(id,callback)=>{
    db.query(`Select * from userDetails where id=?`,
    [id],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    return callback(null,result[0]);
}   
    );
},
  
updateUser:(data,callback)=>{
    var dob= dateFormat(data.dob, "isoDate");
    db.query(
        `Update userDetails set FirstName=?, LastName=?, Gender=?, DOB=?, Email=?, Password=?,Event=?,Duration=?,PhoneNumber=? where id=?`,
    [
       
data.first_name,
data.last_name,
data.gender,
dob,
data.email,
data.password,
data.event,
data.duration,
data.phoneNumber,
data.id
],
(error,result,fields) =>{
    console.log("service"+result.password);
    if(error){
      return callback(error);
    }
    return callback(null,result[0]);
}   
    );
},

deleteUser:(data,callback)=>{
    db.query(`Delete from userDetails where id=?`,
    [data.id],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    return callback(null,result[0]);
}   
    );
},

getUserByEmail:(email,callback)=>{
    db.query(`Select password from userDetails where email=?`,
    [email],
(error,result,fields) =>{
   
    if(error){
      return callback(error);
      }
    return callback(null,result[0]);
}   
    );
}

};
