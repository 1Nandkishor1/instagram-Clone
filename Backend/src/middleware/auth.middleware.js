let jwt=require('jsonwebtoken');
function indentifyUser(req,res,next){
    let token =req.cookies.token;
      if(!token) {
        return res.status(401).json({
          message:"Token Expired,Unauthorized Access"
        })
      }
      let decoded=null;
      try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
      }
      catch(err){
        return res.status(401).json({
          message:"Invalid User"
        })
      }
      req.user=decoded;//kuch bhi naam rakh sakte hai req.trump
      next();

}
module.exports=indentifyUser;