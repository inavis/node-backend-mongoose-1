const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const {sendConfirmationLink} = require("../helper/sendEmail")
const {auth} = require('../middleware/auth')



const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Users")
})


router.post("/register",async(req,res)=>{
    
    //users will be collection in which data is added
    const user =new User(req.body);
    //hashing password
    user.password = await user.genPassword(req.body.password)

    //adding data to collection
    user.save()
    .then(()=>{
        sendConfirmationLink(user.email)
        res.status(200).send({message:"User added successfully"});
    })
    .catch(err=>res.status(400).send({message:"Failed",err}))
})

router.post("/login",async(req,res)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user){
        res.send({message:"No such user"});
        return null;
    }
    console.log(user)


    //compare passwords
   user.comparePassword(req.body.password, (err,isMatch)=>{
        if(err){
        res.status(400).send({message:"Some error occured"})
        }
        if(!isMatch){
            res.send({message:"Check your credentials again"})
        }
        console.log(isMatch)
    })

    user.generateToken((err,userDetails)=>{
        if(err){
            res.status(400).send({message:"Some error occured"})
        }
        console.log(userDetails.token)
        res.status(200)
        .send({message:"Login Success",user:{
            id:userDetails._id,
            firstname:userDetails.firstname,
            lastname:userDetails.lastname,
            role:userDetails.role,
            email:userDetails.email,
            token:userDetails.token
        }})
    })
})

router.get("/logout",auth,(req,res)=>{
    //in auth we have set req.user,req.token
    console.log("logout")
    console.log(req.user,req.token)
    User.findOneAndUpdate({_id:req.user},{token:""},(err,doc)=>{
        if(err)
            res.status(400).send({message:"Logout Failed"})
        res.status(200).send({message:"Logout Success"})
    })  
})

const userRouter = router;
module.exports = userRouter;