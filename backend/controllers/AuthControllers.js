const UserModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user = await UserModel.findOne({email}) ; 
        if(user){
            return res.status(409).json({message:"user already exists", success:false})
        } 
        const newuser = new UserModel ({name,email,password});
        newuser.password = await bcrypt.hash(password,10);
        await newuser.save();
        res.status(201).json({message:"user created success",success:true});
    }catch(err){
        console.error("SIGNUP ERROR:", err); 
        res.status(500).json({message:"internal server error",success:false});
    }
}
const login=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found",success:false});
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({message:"invalid credentials",success:false});
        }
        const jwtToken = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:'106h'});
        res.status(200).json({message:"login success",success:"true",jwtToken,email,name:user.name});



    }catch(err){
        res.status(500).json({message:"internal login server error",success:false});
    }
}



module.exports={signup , login}