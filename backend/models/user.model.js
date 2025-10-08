const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },
    
    phone: { type: String, required: true, unique: true },
    
    password: { type: String, required: true },
    
    role: { type: String, default: "BUYER", enum : ["BUYER", "SELLER", "ADMIN"] }
}, { timestamps: true });

const User= mongoose.model('User', userSchema);

module.exports = User;