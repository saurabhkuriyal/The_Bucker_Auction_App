const cloudinary = require("cloudinary").v2;
const Flyer = require("../models/flyer.model");

async function createFlyer(req,res) {
    try {

        console.log("reached here in flyer controller",req.body);
        console.log("file details",req.file);

        //for storing image in cloudinary
        flyerImage = "";
        if (req.file) {
            cloudinary.config({
                cloud_name: "deuofkrkf",
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUNDINARY_API_SECRET
            });

            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result.secure_url, 'uploaded.secure_url');
            flyerImage = result.secure_url;
        }        

        const { title, description, } = req.body;

        const newFlyer = new Flyer({
            title,
            description,
            imageUrl: flyerImage,
        });

        await newFlyer.save();

        console.log("new flyer details----",newFlyer);
        
        return res.status(200).json({success:true,message: "Flyer created successfully"});
        
        
    } catch (error) {
        console.log("flyer creation error",error );
        
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}


async function getFlyers(req, res) {
    try {
        const flyers = await Flyer.findOne().sort({ createdAt: -1 });

        console.log("Fetched flyers:", flyers);
        
        return res.status(200).json({ success: true, flyers });
    }   catch (error) {
        console.error("Error fetching flyers:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { createFlyer,
    getFlyers
 };