//Create HTTP server
    //Import express module
    import exp from 'express'
    //Create HTTP server
    //import userAPI 
    import { userApp } from './APIs/userAPI.js';

    //import productAPI
    import { productApp } from './APIs/productAPI.js';
    const app=exp();
    //Assign port number
    app.listen(3000,()=>{
        console.log("HTTP server listening on port 3000");
    })

//body parsing middleware
app.use(exp.json())

//forward request to user app when path starts with '/user-api/'
app.use('/user-api',userApp);
app.use('/product-api',productApp);

