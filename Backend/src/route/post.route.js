let express=require('express');
let multer=require('multer');//multer pacjage is Required for file handling
let upload = multer({ storage: multer.memoryStorage() });
let indentifyUser=require('../middleware/auth.middleware');





let postRouter=express.Router();

let postcontroller=require('../controller/post.controller');


postRouter.post("/",indentifyUser,upload.single("image"),postcontroller.createPostController);

postRouter.get('/',indentifyUser,postcontroller.getPostController);

postRouter.get('/detail/:postid',indentifyUser,postcontroller.getPostDetailController);

postRouter.get('/feed',indentifyUser,postcontroller.getfeedcontroller)

module.exports=postRouter;
