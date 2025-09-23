const mongoose=require('mongoose');

const uri=process.env.MONGODB_URI;


const connectDB=async()=>{
    try{
        //console.log("there is ",uri);
        
        await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        //console.log("MongoDB connected");
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports=connectDB;