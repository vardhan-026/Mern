import { Schema,model} from "mongoose";

const cartSchema= new Schema({
     product:{
          type:Schema.Types.ObjectId,
          ref:'product'
     },
     quantity:{
               type:Number,
               default:1
     }
})
///
const userSchema= new Schema({
     name:{
          type:String,
          required:[true,"Name is reqired"]
     },
     email:{
          type:String,
          required:[true,"Required Email"],
          unique:true //add to index
     },
     password:{
          type:String,
          required:[true,"password requard"],
     },
     cart:{
          type:[cartSchema]
     }

},{
     statics:"throw",
     timestamps:true
})
export const UserModel= model("user",userSchema);