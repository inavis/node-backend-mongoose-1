const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const tempUserSchema = mongoose.Schema({
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

tempUserSchema.methods.genPassword = async function(password){
    const salt =await bcrypt.genSalt(10);
    const hashedpassword =await bcrypt.hash(password,salt)
    //console.log(password,salt,hashedpassword);
    return hashedpassword
}

//now this is added to tempuser collection of myFirstDatabase
const tempUser = mongoose.model("tempUser",tempUserSchema);
module.exports = tempUser;