import { Schema,model } from "mongoose";

const productSchema=new Schema({
     productName:{
          type:String,
          required:[true,"required productname"]
     },
     price:{
          type:Number,
          required:[true,"product price required"]
     },
     brand:{
          type:String,
          required:[true,"product brand"]
     }
},{
     strict:"throw",
     timestamps:true
})
export const ProductModel= model("product",productSchema);
