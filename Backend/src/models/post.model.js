let mongoose=require('mongoose');

let postSchema=mongoose.Schema({

    imageurl:{
        type:String,
        required:[true,"Create A post To Add It"],
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'Unauthorized Access:User Not Found']
    },
    caption:{
        type:String
    }
})

let postModel=mongoose.model('post',postSchema);

module.exports=postModel;