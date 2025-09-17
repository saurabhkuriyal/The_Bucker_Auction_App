const mongoose =require('mongoose');

const flyerSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String },
    imageUrl: { type: String },
}, { timestamps: true });

const Flyer = mongoose.model('Flyer', flyerSchema);
module.exports = Flyer;