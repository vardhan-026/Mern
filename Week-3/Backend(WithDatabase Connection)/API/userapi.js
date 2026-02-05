import exp from 'express';
import { UserModel } from "../Models/user_model.js"
import { hash,compare} from 'bcryptjs';
import { verifyToken } from '../Middleware/verifytoken.js';
import jwt from 'jsonwebtoken';
export const userApp=exp.Router()
//user api routes
//create user
userApp.post('/user',async(req,res)=>{
     //get  newuser from req
     let newUser=req.body;
     //hash the password
     let hashedPassword= await hash(newUser.password,7);
     //replace  plain passwaord with the hased password
     newUser.password=hashedPassword
     //create a new user document
     let newUserDoc=new UserModel(newUser)
     //save in database
     await newUserDoc.save()
     //send response
     res.status(200).json({message:"user created",newUserDoc})
})

//read user
userApp.get('/user',async(req,res)=>{
     //read user from db
     //projection
     let users=await UserModel.find()
     //send res
     res.status(200).json({message:"Users in database",users})
})

//read user by id 
userApp.get('/user/:id',async(req,res)=>{
     //get ObjId 
     let objId= req.params.id;
     //find user id
     let userObj=await UserModel.findById(objId);
     //send res
     res.status(200).json({message:"reading user by id",userObj})
})

//update user by id
userApp.put('/user/:id',async(req,res)=>{
     //get id
     let objId=req.params.id;
     //get modified user from req
     let modifiedUser=req.body;
     //make update
     let latestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new: true,runValidators:true});
     //send req
     res.status(200).json({message : "user Modified",payload: latestUser} );

})

//delete user
userApp.delete('/user/:id',async(req,res)=>{
     //get user id
     let objId=req.params.id;
     //delete user by id
     let deletedUser=await UserModel.findByIdAndDelete(objId)
     res.status(200).json({message:"User deleted",payload:deletedUser})
})
//User Authentication route
userApp.post('/auth',async(req,res)=>{
     //get user cred
     let userCred=req.body
     //check for username
     let userOfDb=await UserModel.findOne({username:userCred.username});
     //if user not found
     if( userOfDb===null){
          return res.status(404).json({message:"Invalid username"})
     }
     //compare passwords
     let status= await compare(userCred.password,userOfDb.password);
     if (status==false){
          return res.status(404).json({message:"Invalid password"})
     }
     //create a jwt token
     let signedToken= jwt.sign({username:userCred.username},'abcdef',{expiresIn:30})
     //save token as http only cookie
     res.cookie('token',signedToken,{
          httpOnly:true, //it is http only cookie
          secure:false,
          sameSite:'lax'
     });
     //send token as res
     res.status(200).json({message:"login success"})
})

//test route to verify token(protected)
userApp.get('/test',verifyToken,async(req,res)=>{
     res.json({message:"token verified "})
}) 