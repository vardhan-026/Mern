import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/user_api.js"
import { productApp } from "./APIs/product_api.js"
//create http server
const app=exp()
const port=4000
//connect to mongodDB database
async function connectDB(){
     try{
     await connect('mongodb://localhost:27017/ecomDB');
     console.log("database connected successfully")
     app.listen(port,()=>console.log("Server running on port 4000..."));
     }catch(err){
          console.log(err);
     }
}
connectDB()
//use body parse
app.use(exp.json());
//froward req to sepific APIS
app.use('/user-api',userApp)
app.use('/product-api',productApp)

app.use((err,req,res,next)=>{
     res.status(200).json({message:"error",payload:err.message})
})