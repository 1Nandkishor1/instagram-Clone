let express=require('express');
let likeRouter=express.Router();
let indentifyUser=require('../middleware/auth.middleware');
let likecontroller=require('../controller/like.controller');

likeRouter.post('/like/:postid',indentifyUser,likecontroller.postlikecontroller);

likeRouter.post('/unlike/:postid',indentifyUser,likecontroller.postunlikecontroller)

module.exports=likeRouter;