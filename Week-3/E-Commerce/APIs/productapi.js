import exp from "express";
import { ProductModel} from "../Models/product_model.js"
export const productApp= exp.Router();
//create product
productApp.post("/product",async(req,res)=>{
     //get productobj
     let newProduct=req.body;
     //new doc and save it
     let newProductDoc= ProductModel(newProduct);
     await newProductDoc.save()
     //send res
     res.status(200).json({message:"product added",payload:newProduct})
})
//get products
productApp.get("/product",async(req,res)=>{
     let productobj= await ProductModel.find();
     res.json({message:"get method",product:productobj})
})