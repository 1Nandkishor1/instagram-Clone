let mongoose=require('mongoose');

async function ConnectToDB(){
   await mongoose.connect(process.env.MONGO_URL)
   console.log("Database Is Connected Successfully")
}

module.exports=ConnectToDB;