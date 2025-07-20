import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:[true,"Please provide an username"],
    
   },
   email:{
    type:String,
    required:[true,"Please provide an email"],
    unique:true
   },
   password:{
    type:String,
    required:[true,'Please provide a password']
   },
   isVerified:{
    type:Boolean,
    default:false,

   },
   isAdmin:{
    type:Boolean,
    default:false
   },
   forgotPasswordToken:String,
   forgotPasswordTokenExpiry:Date,
   verifyToken:String,
   verifyTokenExpiry:Date
})
//There is a special way to export our models from mongoose
// There might be a change that the model is already created on the database


const User=mongoose.models.allusers || mongoose.model("allusers",userSchema)

export default User

