async function createFlyer(req,res) {
    try {

        console.log("reached here in flyer controller",req.body,req.file);

        return res.status(200).json({success:true,message: "Flyer created successfully"});
        
        
    } catch (error) {
        console.log("flyer creation error",error );
        
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

module.exports = { createFlyer };