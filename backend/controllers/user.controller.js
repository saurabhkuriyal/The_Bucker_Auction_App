const mongoose = require('mongoose');
const User = require('../models/user.model');

async function registerUser(req,res) {
    try {

        const { username, email, password, phone } = req.body;

        console.log("reacher here",req.body);

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

        return res.status(201).json({success:true,message: "User registered successfully"});
        
    } catch (error) {
        console.log("user registration error",error);

        return res.status(500).json({success:false, message: "Internal Server Error"});
        
    }
}

module.exports = { registerUser };