let followModel=require('../models/follow.model');
let userModel=require('../models/user.model')

async function postfollowrequestcontroller(req,res){
    let follower=req.user.username;
    let followee=req.params.username;

    if(follower===followee){
        return res.status(401).json({
            message:"You can not follow yourself"
        })
    }
    let isFollowed=await followModel.findOne({
        follower:follower,
        followee:followee,
    })

    let isvalidfollowee=await userModel.findOne({
        username:followee
    })
    if(!isvalidfollowee){
      return  res.status(401).json({
            message:"The User you are trying to folow does not exist"
        })
    }

    if(isFollowed){
        return res.status(401).json({
            message:"You can not follow more than once"
        })
    }

    let follow=await followModel.create({
        follower:follower,
        followee:followee,
        status:"pending"
    })

    res.status(201).json({
        message:"Follow request sent successfully",
        follow
    })

}

async function postfollowrequestacceptcontroller(req,res){
    let follower=req.params.follower;
    let followee=req.user.username;

    console.log(follower,followee);

    let isvalidfollower=await followModel.findOne({
        follower:follower,
        followee:followee,
        status:"pending"
        
    })
    if(!isvalidfollower){
        return res.status(401).json({
            message:"User Not Found "
        })
    }
    let acceptrequest=await followModel.findOneAndUpdate({
        follower:follower,
        followee:followee,
        status:"pending"
    },{
        status:"accepted"
    },{new:true})
    res.status(201).json({
        message:"Follow request accepted successfully",
        acceptrequest
    })
    

}

async function postunfollowcontroller(req,res){
    let follower = req.user.username;   // ✅ FIXED
    let followee  = req.params.follower;   

    let isvaliduser=await followModel.findOne({follower:follower,followee:followee,status:"accepted"});
    if(!isvaliduser){
        return res.status(401).json({
            message:"User Do not exist you want to unfollow"
        })
    }

    let unfollow=await followModel.findOneAndDelete({
        follower:follower,
        followee:followee
    })
    res.status(200).json({
        message:"Unfollow request successfully completed",
        unfollow
        
    })

}

async function getfollowercontroller(req,res){
    let followee=req.user.username;

    let followerexist=await followModel.findOne({followee:followee});
    if(!followerexist){
        res.status(401).jason({
            message:'Follower does not exist'
        })
    }
    let followers=await followModel.find({followee:followee});

    res.status(200).json({
        message:"Followers Fetched Successfully",
        followers,
    })
}

async function getfollowingcontroller(req,res){
    let follower=req.user.username;

    let followingexist=await followModel.findOne({follower:follower});
    if(!followingexist){
        res.status(401).jason({
            message:'does not follow anyone'
        })
    }
    let following=await followModel.find({follower:follower});

    res.status(200).json({
        message:"Followers Fetched Successfully",
        following,
    })
}



module.exports={postfollowrequestcontroller,postfollowrequestacceptcontroller,postunfollowcontroller,getfollowercontroller,getfollowingcontroller};

