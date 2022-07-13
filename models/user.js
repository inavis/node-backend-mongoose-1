const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userScheme = mongoose.Schema({
    firstName:{
        type:String,
        maxlength:50
    },
    lastName:{
        type:String,
        maxlength:60
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:16,
        maxlength:100,
    },
    number:{
        type:Number,
        maxlength:10
    },
    email_verify_status:{
        type:String,
        default:"Pending"
    },
    phone_verify_status:{
        type:String,
        default:"Pending"
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userScheme.methods.genPassword = async function(password){
    const salt =await bcrypt.genSalt(10);
    const hashedpassword =await bcrypt.hash(password,salt)
    //console.log(password,salt,hashedpassword);
    return hashedpassword
}

userScheme.methods.comparePassword= async function(plainpassword,cb){
    console.log(plainpassword,this.password)
    const isMatch = await bcrypt.compare(plainpassword,this.password)
    return cb(null,isMatch) 
}

userScheme.methods.generateToken = function(cb){
    //getting current user
    const user = this;
    const token =  jwt.sign(this._id.toHexString(),process.env.SECRET);

    //changing token and updating DB
    user.token=token;
    user.save().then(()=>{
        return cb(null,user)
    }).catch((err)=>{return cb(err)})
}

const User = mongoose.model("User",userScheme);
module.exports = User;