// Next js is an edge run frame work so it doesn't 
// stay connected with your database

import {connect} from "@/dbconfig/config"
// @ refers to root directory

import User from "@/app/models/usermodels"
// NextRequest and NextResponse are like normal
// request and response in express
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()

// handling requests
export async function POST(request:NextRequest){
    try{
       const reqBody=await request.json()
       const {username,email,password}=reqBody
       console.log(reqBody)

    // check if user already exists
   const user= await User.findOne({email})

   if(user){
    return NextResponse.json({error:"User already exists"})
   }
   
   //hash password
const salt =await bcryptjs.genSalt(10)
const hashedPassword=await bcryptjs.hash(password,salt)

const newUser=new User({
    username,
    email,
    password:hashedPassword
})

const savedUser=await newUser.save()
console.log(savedUser)

//send an verification email
await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})

return NextResponse.json({
    message:"User created successfully"    
},{status:201})



    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }

}