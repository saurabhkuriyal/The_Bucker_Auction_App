const mongoose =require('mongoose');

const flyerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Flyer = mongoose.model('Flyer', flyerSchema);
module.exports = Flyer;