import exp from 'express';
import { userApp } from "./API/userapi.js"
import { productApp } from "./API/productapi.js"
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
const app = exp();
const port=4000;
app.use(cookieParser());
//connect to database
async function dbconnect(){
     try{
     //mongodb connection
     let db= await connect('mongodb://localhost:27017/anuragdb')
     console.log("database connected successfully")
     //http connection,asign port number
     app.listen(port,()=>console.log("Server running on port 4000..."));
     }catch(err){
          console.log("error in DB connection",err)
     }
}
dbconnect();
//body parser middleware
app.use(exp.json())
//if path starts with /user-api, forward the request to userApp
app.use('/user-api',userApp)

app.use('/product-api',productApp)

//error handling in the middleware
app.use((err,req,res,next)=>{
     res.status(200).json({message:"error",message:err.message})
})