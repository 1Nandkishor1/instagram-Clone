let userModel = require("../models/user.model");
let bcrypt=require('bcryptjs');
let JWT = require("jsonwebtoken");

async function regesterController(req, res)  {
  let { username, email, password, bio, profile } = req.body;

  let isUserExist = await userModel.findOne({ $or: [{ email }, { username }] });
  if (isUserExist) {
    return res.status(409).json({
      message:
        isUserExist.email == email
          ? "User Exist With this username"
          : "User exist With this Email",
    });
  }
  let user = await userModel.create({
    username,
    email,
    password:await bcrypt.hash(password,10),
    bio,
    profile,
  });

  let token = JWT.sign(
    {
      id: user._id,
      username:user.username
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Profile Craeted Successfully",
    user: {
      usename: user.username,
      email: user.email,
      bio: user.bio,
    },
    token,
  });
};

async function loginController(req, res) {
  let { username, email, password } = req.body; //if anyone is not sent than value is set undefined for that variable

  let isUserExist = await userModel.findOne({ $or: [{ email:email }, { username:username }] }).select("+password");
  if (!isUserExist) {
    return res.status(409).json({
      message: "User Does'nt Exist",
    });
  }
  // let hash = crypto.createHash("md5").update(password).digest("hex");
  let isCorrectPassword = await bcrypt.compare(password,isUserExist.password);
  if (!isCorrectPassword) {
    return res.status(409).json({
      message: "User Does Not Exist With This Password",
    });
  }
  let token = JWT.sign(
    {
      id: isUserExist._id,
      username:isUserExist.username
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token",token);
  res.status(200).json({
    message:"User Loged In Successfully",
    user:{
        username:isUserExist.username,
        email:isUserExist.email,
    },
    token
  })
};

async function getmeController(req,res){
  let userdata=await userModel.findWithId(req.user.id);
  if(!userdata){
    return res.status(401).json({
      message:"User Data Do Not Exist For This Data"
    })
  }
  res.status(200).json({
    message:"Data Fetched Successfully",
    user:{
      username:userdata.username,
      email:userdata.email,
      bio:userdata.bio,
      frofileimage:userdata.frofileimage
    }
  })
}

module.exports={
    loginController,
    regesterController,
    getmeController
}

