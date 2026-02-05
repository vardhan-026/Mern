import { Schema,model } from "mongoose";

//create user schema (username,password,age)
const userSchema=new Schema({
     username:{
          type:String,
          required:[true,'username is required'],
          minlength:[4,"min length should be 4"],
          maxlength:[6,"max length should be 6"],
     },
     password:{
          type:String,
          required:[true,'password is required'],
     },
     age:{
          type:Number,
          required:[true,"Age is required"],
          minage:[10,"minimum age is 10"],
          maxage:[25,"maxmimum age is 25"]
     }
},{
     strict:"throw",
     timestamps:true
});

//create cont 
export const UserModel=model("user",userSchema);