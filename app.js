require('dotenv').config()

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


const userschema=new Schema({
  name:{type:String,required:true},
  password:{type:String, required:true}
})

const User=mongoose.model("User",userschema)

mongoose.connect(MONGODB_URL)
.then(
()=>{
    console.log("Mongodb connected");
app.listen(PORT,console.log(`App running on ${PORT}}`))})
.catch((err)=>console.log(err));


//--------------------------UNTESTED CODE---------------------------------------
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

app.post('/register',async (req,res)=>{
try {
    const {username , password}=req.body;
    const validatename=username.trim().toLowerCase()
    if(!validatename||!password) return res.status(401).json({message:"All params must be filled"});
    const existinguser=User.findOne({username:validatename});
    if(existinguser) return res.status(409).json({message:"User already exists"})
    const hashedpassword=await bcrypt.hash(password,10)
    await User.create({username:validatename,password:hashedpassword});
    const token=jwt.sign({username},JWT_SECRET)
    return res.status(200).json({message:`User "${validatename}" created.`,token})
} catch (err) {
  return res.status(500).json({err})
}
    
})
app.post('/login',async (req,res)=>{
try {
        const {username, password}=req.body;
    const validatename=username.trim().toLowerCase();
    if(!validatename||!password) return res.status(401).json({message:"All params must be filled"});
    const user=User.findOne({username:validatename});
    if(!user) return res.status(400).json({message:"User doesn't exist"})
    const compare=bcrypt.compare(password||user.password);
    if(!compare) return res.status(400).json({message:"Invalid credentials"});
    const token=jwt.sign({username},JWT_SECRET)
    return res.status(200).json({message:`Welcome back, "${validatename}"`,token})
} catch (err) {
 return res.status(500).json({err})   
}
})

app.use((req,res)=>{
    res.status(404).json({message:"This route doesn't exist"})
})


