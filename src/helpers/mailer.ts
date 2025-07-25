import nodemailer from 'nodemailer';
import User from '@/app/models/usermodels'
import bcryptjs from 'bcryptjs';


export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
      const hashedToken=await bcryptjs.hash(userId.toString(),10)
     if(emailType==='VERIFY')
      await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000},{new:true,runValidators:true})
   else if(emailType==='RESET'){
          await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000},{new:true,runValidators:true})

   }
 // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6b1a5cefbb2394",
    pass: "0381c952e63844"
  }
});

const mailOptions={
    from:'tridibroychowdhury9@gmail.com',
    to:email,
    subject:emailType==='VERIFY'?'Verify your account':'Reset your password',
    html:emailType==='VERIFY'?`<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
    ${emailType==='VERIFY'?'verify your email':'reset your password'}
    or copy and paste the link in your browser
    <br>${process.env.DOMAIN}/verifiyemail?token=${hashedToken}
    </p>`:`<p>Click<a href="${process.env.DOMAIN}/changepassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link in your browser<br>`
}

const mailresponse=await transport.sendMail(mailOptions)
return mailresponse;

    } catch (error) {
        
    }
}