let mongoose=require('mongoose');

let userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User Exist With This Username"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"User Exist With This Email"],
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    bio:String,
    profile:{
        type:String,
        default:"https://ik.imagekit.io/4vn93409m/defaultuser.jpg",
    }
})

let userModel=mongoose.model('user',userSchema);

module.exports=userModel;