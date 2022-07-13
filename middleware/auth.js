var {response} = require('express')
const jwt = require('jsonwebtoken');

const auth = (request,reponse,next) =>{
    console.log("auth")
    const token = request.header("x-auth-token")

    jwt.verify(token,process.env.SECRET,(err,decode)=>{
        if(err)
            {
                return response.send({error:err})
            }
           // console.log(decode) // we will get _id used to generate token

           //setting values and it can be used further
           request.user = decode;
           request.token = token;
           console.log(request.user,request.token)
        next();
    });
}

module.exports = {auth}