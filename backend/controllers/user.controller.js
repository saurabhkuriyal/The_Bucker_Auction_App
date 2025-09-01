const mongoose = require('mongoose');
const User = require('../models/user.model');

async function registerUser(req,res) {
    try {

        const { username, email, password, phone } = req.body;

        console.log("reacher here");

        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        // Create new user
        const newUser = new User({ username, email, password, phone });
        await newUser.save();

        return res.status(201).json({message: "User registered successfully"});
        
    } catch (error) {
        console.log("user registration error",error);

        return res.status(500).json({message: "Internal Server Error"});
        
    }
}

module.exports = { registerUser };