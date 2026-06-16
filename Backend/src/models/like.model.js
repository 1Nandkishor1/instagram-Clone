let mongoose=require('mongoose');

let likeSchema=mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,'post is required to be liked']
    },
    username:{
        type:String,
        required:[true,'username is required to like the post']
    }
},{timestamps:true})

likeSchema.index({postid:1,username:1},{unique:true});

let likeModel=mongoose.model('like',likeSchema);

module.exports=likeModel;