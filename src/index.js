const express=require('express');
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const e = require('express');


const app=express();

//convert data into json
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//use ejs as view engine
app.set('view engine','ejs');

//static file
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
})

//register user
app.post("/signup",async (req,res)=>{
        const data={
            name:req.body.username,
            password:req.body.password
        }

        //check if the user exist already
        const existingUser=await collection.findOne({name:data.name});
        if(existingUser){
            res.send("user already exists.Please choose a different name");
        }
        else{
            //hash the password
            const saltRounds=10;//number of salt round for bcrypt
            const hashedPassword=  await bcrypt.hash(data.password,saltRounds);
            data.password=hashedPassword;//replacing the original password into hashed password


            const userdata=await collection.insertMany(data);
            console.log(userdata);
        }
})

//login user
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check)
            {
                res.send("user name cannot found");
            }
            //compare the hash password from the database with the palin text
            const ispasswordMatch=await bcrypt.compare(req.body.password,check.password);
            if(ispasswordMatch)
                {
                    res.render("home");
                }
                else{
                    req.send("wrong password");
                }

    }
    catch{
        res.send("wrong Details");
    }
})

const port=5000;
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})