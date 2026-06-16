let postModel = require("../models/post.model");
let likeModel=require("../models/like.model")
let ImageKit = require("@imagekit/nodejs");
let { toFile } = require("@imagekit/nodejs");
let jwt=require('jsonwebtoken');
const followModel = require("../models/follow.model");
let mongoose=require('mongoose')


let client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function createPostController(req, res) {
  // let token=req.cookies.token;
  // if(!token){
  //   return res.status(401).json({
  //       message: "No token provided",
  //     });
  // }
  // let decode=null;
  // try {
  //  decode=jwt.verify(token,process.env.JWT_SECRET);
  // }
  // catch(err){
  //   return res.status(401).json({
  //     message:"Unauthorized User"
  //   })
  // }
  
  
  let { caption, imageurl } = req.body;
  console.log(req.body, req.file);

  const file = await client.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: "image",
  })

  let post=await postModel.create({
    caption:caption,
    imageurl:file.url,
    userid:req.user.id

  })
  res.send(post);
}

async function getPostController(req,res){
  // let token=req.cookies.token;
  // if(!token){
  //   return res.status(401).json({
  //     message:"Token Expired,Unauthorized Access"
  //   })
  // }
  // let docoded=null;
  // try{
  //  decoded=jwt.verify(token,process.env.JWT_SECRET);
  // }
  // catch(err){
  //   return res.status(401).json({
  //     message:"Invalid User"
  //   })
  // }

  let posts=await postModel.find({
    id:req.user.id,
  })

  res.status(201).json({
    message:"Post Fetched Successfully",
    posts
  })



}

async function getPostDetailController(req,res){
  // let token =req.cookies.token;
  // if(!token) {
  //   return res.status(401).json({
  //     message:"Token Expired,Unauthorized Access"
  //   })
  // }
  // let decoded=null;
  // try{
  //   decoded=jwt.verify(token,process.env.JWT_SECRET);
  // }
  // catch(err){
  //   return res.status(401).json({
  //     message:"Invalid User"
  //   })
  // }
  let postparamid=req.params.postid;
  

  let postdetail=await postModel.findById(postparamid)

  if(!postdetail){
    return res.status(401).json({
      message:"Post Not Found"
    })
  }
  if(postdetail.userid.toString()!==req.user.id){
    return res.status(401).json({
      message:"Invalid Post Request"
    })
  }

  res.status(201).json({
    message:"Detail Fetched Successfully",
    postdetail
  })


}

async function getfeedcontroller(req,res){
  let user=req.user;
  let posts=await Promise.all((await postModel.find().populate("userid").lean())
  .map(async (post)=>{


let isLiked = await likeModel.findOne({
        username: user.username,
        postid: post._id   // ✅ no need to convert
      });

    let isFollowed=await followModel.findOne({
      follower:user.username,
      followee:post.userid.username,
      
    })


     post.isLiked=Boolean(isLiked)
     post.isFollowed=isFollowed

     return post

  }))

  res.status(200).json({
    message:"Data Fetched Successfully",
    posts
  })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  getfeedcontroller
}

