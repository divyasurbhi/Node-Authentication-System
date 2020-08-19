const db= require('../../config/database');
var dateFormat = require('dateformat');

module.exports={

    createUser:(data,callback)=>{
       
    var dob= dateFormat(data.dob, "isoDate");
               
        db.query(
        `insert into userDetails(FirstName,LastName,Gender,DOB,Email,Password,Event, Duration,PhoneNumber,Photo)
        values(?,?,?,?,?,?,?,?,?,?)`,
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
data.photo
],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    else{
        console.log("resultset from service"+ result[0]);
        return callback(null,result[0]);
    }
    
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
    db.query(`Select FirstName,LastName,Email,Gender,PhoneNumber,DOB,Photo from userDetails where id=?`,
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
        `Update userDetails set FirstName=?, LastName=?, Gender=?, DOB=?, Email=?, PhoneNumber=?  where id=?`,
    [
       
data.first_name,
data.last_name,
data.gender,
dob,
data.email,
data.phoneNumber,
//data.photo,
data.id
],
(error,result,fields) =>{
  
    if(error){
      return callback(error);
    }
    return callback(null,result);
}   
    );
},

deleteUser:(data,callback)=>{
    console.log("id"+data.id);
    db.query(`Delete from userDetails where id=?`,
    [data.id],
(error,result,fields) =>{
    if(error){
      return callback(error);
    }
    return callback(null,result);
}   
    );
},

getUserByEmail:(email,callback)=>{
    db.query(`Select Id,FirstName,LastName,Gender,DOB,Event,Duration,PhoneNumber,Photo,Password from userDetails where email=?`,
    [email],
(error,result,fields) =>{
   
    if(error){
        console.log("from service"+error);
      return callback(error);
     
      }
      
    return callback(null,result);
}   
    );
}

};
