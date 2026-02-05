import { Schema,model } from "mongoose";
//create product schema (name,price ,brand)
const productSchema = new Schema({
     name:{
          type:String,
          required:[true,"product name required"],
          minlength:[3,"3 should be min length"],
          maxlength:[10,"10 should be max length"]
     },
     price:{
          type:Number,
          required:[true,"price required"],
     },
     brand:{
          type:String,
          required:[true,"brand name required"],
          minlength:[3,"3 should be min length"],
          maxlength:[10,"10 should be max length"]
     }
},{
     strict:"throw",
     timestamps:true
})

export const ProductModel=model("product",productSchema)