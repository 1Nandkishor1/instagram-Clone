require('dotenv').config();
let app=require("./src/app");
let ConnectToDB=require('./src/config/database');

ConnectToDB()


app.listen(3000,()=>{
    console.log("Server is Running On Port 3000")
})