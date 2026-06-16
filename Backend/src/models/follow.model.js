let mongoose=require('mongoose');

let followSchema=mongoose.Schema({
    follower:{
        type:String,
    },
    followee:{
        type:String,
    },
    status:{
        type:String,
        required:[true,'status is required'],
        default:'pending',
        enum:{
            values:["pending","accepted","rejected"],
            message:"status can only be pending .accepted or rejected"
        }
    }

},{timestamps:true})

followSchema.index({follower:1,followee:1},{unique:true});

let followModel=mongoose.model('follow',followSchema);



module.exports=followModel;