import exp from 'express'
export const authorRouter = exp.Router()

//Register Author
authorRouter.post('./user',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"AUTHOR"});
    //send res
    res.status(201).json({message:"author created",payload:newUserObj});
})
//authenticate author
//create article
//read article of author
//edit article
//delete(soft) article