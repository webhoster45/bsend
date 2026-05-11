const express=require('express');
const mongoose=require('mongoose')
const app=express();
const MONGODB_URL=process.env.MONGODB_URL
const path=require('path');
const Schema=mongoose.Schema;
const limiter=require('limiter');
const jwt=require('jsonwebtoken');
const PORT=process.env.PORT||3000;


mongoose.connect(MONGODB_URL)
.then(
()=>{
    console.log("Mongodb connected");
app.listen(PORT,console.log(`App running on ${PORT}}`))})
.catch((err)=>console.log(err))

const authmiddleware=(req,res)=>{
const token=req.headers["authorization"] [1]
if(!token) res.status(403)
}

app.post('/register',(req,res))
app.post('/login',(req,res))

app.use((req,res)=>{
    res.status(404).json({message:"This route doesn't exist"})
})