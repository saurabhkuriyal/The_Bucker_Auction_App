//const cloudinary = require("cloudinary").v2;

async function createFlyer(req,res) {
    try {

        console.log("reached here in flyer controller",req.body);
        console.log("file details",req.file);

        postImage = "";
        if (req.file) {
            cloudinary.config({
                cloud_name: "deuofkrkf",
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret: "vrtWkACC1-Tra5I0WzJ6tIsstLw"
            });

            const result = await cloudinary.uploader.upload(req.file.path);
            //console.log(result.secure_url, 'uploaded.secure_url');
            postImage = result.secure_url;
        }

        return res.status(200).json({success:true,message: "Flyer created successfully"});
        
        
    } catch (error) {
        console.log("flyer creation error",error );
        
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

module.exports = { createFlyer };