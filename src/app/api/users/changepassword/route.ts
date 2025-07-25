import { NextResponse,NextRequest } from "next/server";
import {connect} from "@/dbconfig/config"
import User from "@/app/models/usermodels"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"
import { toast } from "react-hot-toast";
import Link from "next/link";
connect()

export async function POST(request:NextRequest){
  try {
     const reqBody=await request.json()
     const {password,token}=reqBody
     const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
     if(!user){
        return NextResponse.json({error:"Invalid or expired token"},{status:400})
     }
     console.log(user)
     user.forgotPasswordToken=undefined
     user.forgotPasswordTokenExpiry=undefined
     user.password=await bcryptjs.hash(password,10)
     await user.save()
   

     return NextResponse.json({message:"Password changed successfully"},{status:200})

  } catch (error:any) {
    return NextResponse.json({error:'Something went wrong'},{status:500})
  }


}