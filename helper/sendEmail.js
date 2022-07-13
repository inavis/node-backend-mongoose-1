const nodemailer = require("nodemailer");
const API  = require("../global");

const sendConfirmationLink =(email)=>{
    console.log(process.env.EMAIL,email,API)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject:"Confirm Email Id - Node application",
        // text: `To reset your password, Please click on this link: http://localhost:3000/reset/${token}`,
        html:`
        <h3>Confirm Email Id</h3>
        <div>To confirm your account, Please click <a href=${API}/reset/${email}>here</a></div>
        <div><small>Kindly check in spam folder also.</small></div>
        `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Email failed"+error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {sendConfirmationLink}