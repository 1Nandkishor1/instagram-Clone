let express=require('express');
let followRouter=express.Router();
let followcontroller=require('../controller/follow.controller');
let indentifyUser=require('../middleware/auth.middleware');

followRouter.post('/followrequest/:username',indentifyUser,followcontroller.postfollowrequestcontroller);

followRouter.post('/followrequest/accept/:follower',indentifyUser,followcontroller.postfollowrequestacceptcontroller);

followRouter.post('/unfollow/:follower',indentifyUser,followcontroller.postunfollowcontroller)


followRouter.post('/followers/',indentifyUser,followcontroller.getfollowercontroller)

followRouter.post('/following/',indentifyUser,followcontroller.getfollowingcontroller)

module.exports=followRouter;




