const express=require('express');
const mongoose=require('mongoose')
const app=express();
const MONGODB_URL=process.env.MONGODB_URL
const path=require('path');
const Schema=mongoose.Schema;
const limiter=require('express-rate-limiter');
const jwt=require('jsonwebtoken');
const PORT=process.env.PORT||3000;
const bcrypt=require('bcrypt')
const JWT_SECRET=process.env.JWT_SECRET
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('/public'))


mongoose.connect(MONGODB_URL)
.then(
()=>{
    console.log("Mongodb connected");
app.listen(PORT,console.log(`App running on ${PORT}}`))})
.catch((err)=>console.log(err));

const limiter=()=>{
    Windowms:15*60;
    limit:5
}
const authmiddleware=(req,res,next)=>{
const authheader=req.headers.authorization;
if(authheader)return res.status(401)
if(!token) res.status(403).json({message:"No token provided"});
const token=authheader.split(" ")[1];
jwt.verify(token, JWT_SECRET, (err,decoded)=>{
    if(err)return res.status(403).json({message:"Invalid or Expired token"});
    req.user=decoded;
    next()
})
}

app.post('/register',(req,res)=>{
    const {username , password}
})
app.post('/login',(req,res))

app.use((req,res)=>{
    res.status(404).json({message:"This route doesn't exist"})
})


//install bycrpt express-rate-limiter 