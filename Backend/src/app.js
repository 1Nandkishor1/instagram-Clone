let express=require('express');
let app=express();
app.use(express.json());


let cookieparser=require('cookie-parser');
let cors=require('cors');
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));


let userRouter=require('./route/user.auth');
let postRouter=require('./route/post.route');
let followRouter=require('./route/follow.route');
let likeRouter=require('./route/like.route');




app.use(cookieparser());
app.use("/api/auth",userRouter);
app.use("/api/post",postRouter);
app.use('/api/user',followRouter);
app.use('/api/user',likeRouter);


module.exports=app;