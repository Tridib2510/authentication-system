
import {connect} from "@/dbconfig/config"
// @ refers to root directory

import User from "@/app/models/usermodels"
// NextRequest and NextResponse are like normal
// request and response in express
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {

        console.log('hello')
        
  const reqBody= await request.json()
  const {email,password}=reqBody
  console.log(reqBody)

  const user=await User.findOne({email})
  if(!user){
    return NextResponse.json({error:"User does not exits"},
        {status:400}
    )
  }

//   check if password is correct
const validPassword=await bcryptjs.compare(password,user.password)
if(!validPassword){
    return NextResponse.json({error:"Invalid password"},{status:400})
}
// create token data
const tokenData={
    id:user._id,
    username:user.username,
    email:user.email
    
}

//createToken
const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1D'})

const response=NextResponse.json({
    message:"Login successful",
    success:true
})

response.cookies.set("token",token,{
    httpOnly:true,

})

return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}