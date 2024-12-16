const express = require("express");
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs')
const app = express();
function sendMail (to,state){
  const p = state ? '../views/accept.html':'../views/reject.html'
  const htmlFilePath = path.join(__dirname,p );
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bejaouiam25@gmail.com',
              pass: "deze ixwh pyng qmfx"

            }
          });
          
          var mailOptions = {
            from: 'bejaouiam25@gmail.com',
            to: to,
            subject: 'Your Destination has approved',
            html: htmlContent
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return reject({message:"an error has occurd "})
            } else {
              console.log('Email sent: ' + info.response);
              return resolve({message:"Email sent correctly"})
            }
          });
    })
}
module.exports = sendMail