let likeModel=require('../models/like.model');
let postModel=require('../models/post.model');

async function postlikecontroller(req,res){
    let user=req.user.username;
    let postid=req.params.postid;

    let isvalidpost=await postModel.findById(postid);
    if(!isvalidpost){
        return res.status(401).json({
            message:"The post you want to like dont exist"
        })
    }
    let postlike=await likeModel.create({
        postid:postid,
        username:user
    })
    res.status(200).json({
        message:"post Liked Successfully",
        postlike
    })

}

async function postunlikecontroller(req,res){
    let user=req.user.username;
    let isLiked=await likeModel.findOne({
        postid:req.params.postid,
        username:user,
    })

    if(!isLiked){
        return res.status(400).json({
            message:"Post has not been Liked"
        })
    }

    let unlike=await likeModel.findOneAndDelete({postid:req.params.postid,username:user});
    res.status(200).json({
        message:"Post Unliked Successfully",
        unlike
    })

}

module.exports={
    postlikecontroller,
    postunlikecontroller
}