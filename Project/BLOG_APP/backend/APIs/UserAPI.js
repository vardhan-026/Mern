import exp from 'express'
import {UserModel} from '../services/authorservice.js'
import { register } from 'module';
import { authenticate } from '../../../services/authorservice.js';
export const userRouter = exp.Router()

//Register User
userRouter.post('./user',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"USER"});
    //send res
    res.status(201).json({message:"user created",payload:newUserObj});
})
//authenticate user
userRouter.post('/authenticate',async(req,res)=>{
    //get user obj
    let userCred=req.body;
    //call authenticate service
    let {token,user}=await authenticate(userCred);
    //save token as http only cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:lax,
        secure:false,
    });
    //send res
    res.status(200).json({message:"login success",payload:user});
})
//read article of user
//add comment to an article

