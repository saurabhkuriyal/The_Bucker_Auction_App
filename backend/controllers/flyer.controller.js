async function createFlyer(req,res) {
    try {

        console.log("reached here in flyer controller",req.body,req.file);

        res.status(200).json({success:true,message: "Flyer created successfully"});
        
        
    } catch (error) {
        console.log("flyer creation error",error );
        
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

module.exports = { createFlyer };