const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

exports.loginUser = async (req,res)=>{
    try{
        const {email,password, role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email, password, role});
        if (!user) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.status(200).json({message:"Login successful", user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

exports.registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message:"User already exists"});
        }
        const user = new User({name,email,password,role});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

exports.logoutUser = async (req,res)=>{
    try {
        req.localStorage.removeItem('user');
        res.status(200).json({message:"Logout successful"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

exports.getUserProfile = async (req,res)=>{
    try {
        const {email} = req.user;
        if(!email){
            return res.status(404).json({message:"User not found"});
        }
        const isUser = await User.findOne({email});
        if(!isUser){
            return res.status(404).json({message:"User not found"});
        }
        const userProfile = await UserProfile.findOne({userId:isUser._id});
        res.status(200).json({user:isUser,profile:userProfile});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}
