const mongoose = require('mongoose');
const User = require('../models/user.model');

async function registerUser(req,res) {
    try {

        const { username, email, password, phone } = req.body;

       // console.log("reacher here",req.body);

        if(!username || !email || !password) {
            console.log("missing fields");
            
            return res.status(400).json({success:false,message: "All fields are required"});
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            console.log("User already exists");
            
            return res.status(400).json({success:false,message: "User already exists"});
        }

        // Create new user
        const newUser = new User({ username, email, password, phone });
        await newUser.save();

        return res.status(201).json({success:true,data:newUser,message: "User registered successfully"});
        
    } catch (error) {
        //console.log("user registration error",error);

        return res.status(500).json({success:false, message: "Internal Server Error"});
        
    }
}


async function loginUser(req,res) {
    try {
        const { email, password } = req.body;

        //console.log("reacher here",req.body);
        
        //email and password are required
        if(!email || !password) {
            return res.status(400).json({success:false,message: "Email and password are required"});
        }

        // Find user by email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({success:false,message: "Invalid email or password"});
        }

        // Check password
        if(user.password !== password) {
            return res.status(400).json({success:false,message: "Invalid email or password"});
        }

        
        // Successful login
        return res.status(200).json({success:true,data:user,message: "Login successful"});

    } catch (error) {
        //console.log("user login error",error);
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

async function getAllUser(req, res) {
    try {
        //to get all users
        const users = await User.find();
        return res.status(200).json({ success: true, data: users, message: "Users fetched successfully" });
    } catch (error) {
        //console.log("get all users error", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { registerUser,
                loginUser,
                getAllUser
 };