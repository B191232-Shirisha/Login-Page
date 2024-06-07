const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/login-details");


//checking if database connected or not

connect.then(()=>{
    console.log("Database successfully connected");
})
.catch(()=>{
    console.log("Database cannot connected");
});

//create a schema
const loginschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//coolection part
const collection= new mongoose.model("users",loginschema);
module.exports=collection;