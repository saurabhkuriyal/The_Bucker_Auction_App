const cloudinary = require("cloudinary").v2;
const Flyer = require("../models/flyer.model");

async function createFlyer(req,res) {
    try {

        console.log("reached here in flyer controller",req.body);
        console.log("file details",req.file);

        flyerImage = "";
        if (req.file) {
            cloudinary.config({
                cloud_name: "deuofkrkf",
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret: "vrtWkACC1-Tra5I0WzJ6tIsstLw"
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

        console.log("new flyer details----",newFlyer);
        
        return res.status(200).json({success:true,message: "Flyer created successfully"});
        
        
    } catch (error) {
        console.log("flyer creation error",error );
        
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

module.exports = { createFlyer };