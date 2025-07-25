import { NextResponse,NextRequest } from "next/server";
import {connect} from "@/dbconfig/config"
import User from "@/app/models/usermodels"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const email=reqBody.email
        const user=await User.findOne({email:email})
        if(!user){

            return NextResponse.json({error:"User not found"},{status:404})
        }
        await sendEmail({email,emailType:'RESET',userId:user._id})
        
        return NextResponse.json({message:"Email sent successfully"},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}