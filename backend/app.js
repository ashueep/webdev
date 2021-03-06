const path=require("path");
const express=require('express');
require("./conn");
const User=require("./usermessage.js");
const Job= require("./jobs.js");

const app=express();
console.log();

const staticPath=path.join(__dirname,"../frontend");
console.log(staticPath);
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    try {   
        console.log('GET /');
        console.log((path.join(staticPath, '/index.html'))); 
        res.sendFile((path.join(staticPath, '/index.html'))); 
    }
    catch(error) { console.log(error); }
});
app.post("/contact",async(req,res)=>{
    try {
        //res.send(req.body);
        console.log(req.body);
        const userData=new User(req.body);
        await userData.save();
        res.status(201).redirect("/"); 



    } catch (error) {
        res.status(500).send(error);
    }
})


// app.get('/jobsfinal', async(req, res) => {
//     try {



//     } catch(err){
//         console.log(err)
//     }
// })

    app.post("/jobs",async(req,res)=>{
        try {
            //res.send(req.body);
            console.log(req.body);
            const jobData=new Job(req.body);
            await jobData.save(); 
            res.status(201).redirect("/"); 
        } catch (error) {
            res.status(500).send(error);
        }
})
app.get("/adminlogin",async(req,res)=>{
    try {
        console.log(path.join(__dirname, '../frontend/adminlogin.html'));
        res.sendFile(path.join(__dirname, '../frontend/adminlogin.html'));
    } catch (error) {
        console.log(error);
    }
})

app.post('/adminauth', async(req, res) => {
    try {
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        if(username == 'username' && password == 'password'){
            // Write what HTML file to send when login is successful
            res.send('LOGIN OK...')
        } else {
            // Write what to send when credentials are wrong.
            res.send('INVALID CREDENTIALS')
        }

    } catch (err) {
        console.log(err)
    }
})

app.listen(7000,()=>{
    console.log('http://localhost:7000/');
})
