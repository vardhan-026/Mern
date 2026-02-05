import exp from "express"
import { ProductModel } from "../Models/product_model.js"
//create product router
export const productApp=exp.Router();
//post products
productApp.post('/product',async(req,res)=>{
     let newProduct=req.body;
     //new product doc
     let newProductDoc=new ProductModel(newProduct);
     //saving in db
     await newProductDoc.save()
     //res
     res.status(200).json({message:"product added",payload:newProductDoc})
})

//get products
productApp.get('/product',async(req,res)=>{
     //read products from db
     let products=await ProductModel.find();
     res.json({message:'Products avialable ',payload:products})
})

//get product by id
productApp.get('/product/:id',async(req,res)=>{
     //get id
     let objId=req.params.id;
     //find product by id
     let productobj= await ProductModel.findById(objId);
     res.status(200).json({message:"product by id",payload:productobj});
})
//update product by id
productApp.put('/product/:id',async(req,res)=>{
     //get id
     let objId=req.params.id;
     //get modified product from req
     let modifiedProduct=req.body;
     //make update
     let latestProduct=await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedProduct}},{new: true,runValidators:true});
     //send req
     res.status(200).json({message : "product Modified",payload: latestProduct} );
})
//delete product by id
productApp.delete('/product/:id',async(req,res)=>{
     //get id
     let objId=req.params.id;
     //delete product by id
     let deletedProduct=await ProductModel.findByIdAndDelete(objId);
     //send res
     res.status(200).json({message:"product deleted",payload:deletedProduct});
})