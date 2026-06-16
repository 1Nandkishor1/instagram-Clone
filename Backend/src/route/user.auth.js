let express = require("express");
let authController=require("../controller/auth.controller");
let identifyuser=require("../middleware/auth.middleware")


let userRouter = express.Router();

userRouter.post("/register",authController.regesterController);

userRouter.post("/login",authController.loginController);

userRouter.get("/getme",identifyuser,authController.getmeController)

module.exports = userRouter;
