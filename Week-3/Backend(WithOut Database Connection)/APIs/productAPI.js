//import express 
import exp from 'express'
//create min-express(seperate route )app and export it to main server
export const productApp=exp.Router();

let products=[];

//get request handlinng route
productApp.get('/products',(req,res)=>{
    //send products data in response
        res.status(200).json({message:"All products List",payload:products});
    })

//get product by id
productApp.get('/product/:id',(req,res)=>{
    //get the product details by using id
    //only post,put request can access req.body 
    //for other requests access properties from req.params
    let productid=Number(req.params.id);
    //find if the product exists in it 
    let productIndex=products.findIndex((productObj)=>productObj.id===productid);
    //if the object is not found return "object not found as response"
    if(productIndex===-1){
        res.status(404).json({"message":"Product not found"});
    }
    //otherwise print the object details
    else{
        res.status(200).json({"message":"Requested object details are",payload:products[productIndex]});
    }
})

 //create product-(route for creating a product)
    productApp.post('/products',(req,res)=>{
        //get the details by accessing req.body
        let newProduct=req.body;
        //push the new product into products array
        products.push(newProduct);
    })

//update route(put request is used)
    productApp.put('/products/:id',(req,res)=>{
        //get modified product from the request
        let modifiedProduct=req.body;
        //extract the product using id check if it exists or not
        let idx=products.findIndex((temp)=>temp.id===modifiedProduct.id);
        //if obj doesnot exist return response as "object not found"
        if(idx===-1){
            res.status(404).json({"message":"Product not found"});
        }
        //else update the object and push it to the products array
        else{
            let deletedObj=products.splice(idx,1,modifiedProduct);
        }
        //now send response as object updated and display the details of updated object
        res.status(200).json({"message":"Product details are updated"});

    })

//delete route 
    productApp.delete('/products/:id',(req,res)=>{
        //get the index of the object to be deleted
        let proId=Number(req.params.id);
        console.log(proId);
        let idx=products.findIndex((tempObj)=>tempObj.id===proId);
        console.log(idx);
        //check if it exists in the array or not
        //if the idx===-1 then object does not exist
        if(idx===-1){
        res.status(404).json({"message":"Product not found"});
        }
        //else delete the object from the Products array
        else{
            let deletedObj=products.splice(idx,1);
            res.status(200).json({"message":"Product is deleted Successfully",payload:deletedObj});
        }

    })

