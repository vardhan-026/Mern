import exp from 'express'
//create min-express(seperate route )app
export const userApp=exp.Router()


let users=[];

    //get req handling route(Read users)
    userApp.get('/users',(req,res)=>{
       //send users data in res
       res.status(200).json({message:"all users",payload:users});//message,payload
    });


    //post req handling route(create user)
    userApp.post('/user/:id',(req,res)=>{
       //get user resource from req
       let newUser=req.body;
       //console.log("newUser",newUser);
       users.push(newUser);

       res.status(201).json({"message":"New User added",payload:users});
    })


    //put req handling route(update user)
    userApp.put('/user/:id',(req,res)=>{
       
        //get modified user from req
        let updatedUser=req.body;
        //Find the user with id exists in array
        let userIndex=users.findIndex((userObj)=>userObj.id===updatedUser.id)
        //if user not found,send the res as "user not found"
        if(userIndex===-1){
           return res.status(404).json({message:"User not found"})
        }
        //if user found then modify the user
        let deleteUser=users.splice(userIndex,1,updatedUser);
        //send response as "User modified"
        res.status(200).json({message:"User  modified",payload:users});
    })

    //read user by id
    userApp.get('/users/:id',(req,res)=>{

        //console.log(req.params);
        //read id from url parameter
        let userId=Number(req.params.id )//return an object {id:100}
        //read user by this id
        let user=users.find(usereObj=>usereObj.id===userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //send res
        res.status(200).json({"message":"user",payload:user});
    })

    //delete req handling route(delete route)
    userApp.delete('/user/:id',(req,res)=>{
       //find the user is present or not with id
       let userId=Number(req.params.id);
        let userIndex=users.findIndex((userObj)=>userObj.id===userId);
        if(userIndex===-1){
           return res.status(404).json({"message":"User not found"});
        }else{
            let deleteUser=users.splice(userIndex,1);
        }
        res.status(200).json({"message":"User deleted succesfully",payload:deleteUser});
    });