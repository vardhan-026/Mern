import exp from 'express';
import { hash} from 'bcryptjs';
import {UserModel} from "../Models/user_model.js"
import {ProductModel} from "../Models/product_model.js"
//
export const userApp = exp.Router();

//create user
userApp.post('/user',async(req,res)=>{
     let newUser=req.body;
     //run validater
     await new UserModel(newUser).validate();
     //hash password
     let hashedPassword= await hash(newUser.password,7);
     newUser.password=hashedPassword
     //create DOC and save it
     let newUserDoc= UserModel(newUser);
     await newUserDoc.save({validateBeforeSave:false});
     res.status(200).json({message:"user created",user:newUser})
})

//get users
userApp.get("/user",async(req,res)=>{
     let userobj= await UserModel.find();
     res.json({message:"get method",user:userobj})
})

//put products in cart with quantity
userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
     //read uid and pid from url
     let x=req.params;//{ uid:"",pid:""}
     //check user
     let user =await UserModel.findById(x.uid);
     //console.log(user)
     if(!user){
          return res.status(401).json({message:"user not found"})
     }
     //check product
     let product = await ProductModel.findById(x.pid);
     if(!product){
          return res.status(401).json({message:"product not found"})
     }
     //perform update
     // check if product already in cart
     const productInCart = user.cart.find(item => item.product.toString() === x.pid);
     if (productInCart) {
          //increment quantity
          await UserModel.updateOne(
          { _id: x.uid, "cart.product": x.pid },
          { $inc: { "cart.$.quantity": 1 } });
          return res.status(200).json({message: "product quantity increased"});
     }else {
          //add new product to cart
          await UserModel.findByIdAndUpdate(x.uid,
          { $push: { cart: { product: x.pid, quantity: 1}}});
          return res.status(200).json({message: "product added to cart"});
     }
})

//get user by id
userApp.get("/user/:uid",async(req,res)=>{
     let { uid }=req.params;
     let user= await UserModel.findById(uid).populate("cart.product");
     //console.log(user)
     res.status(200).json({message:"user",payload:user})
})