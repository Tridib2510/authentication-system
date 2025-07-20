// If we are creating a file for frontend then we have to use page.tsx
"use client"


import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import { Axios } from "axios"
export default function LoginPage(){
   const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })

   const onLogin=async()=>{

   }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            
            <label htmlFor="username">email</label>
            <input 
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
           placeholder="email"
           />
            <label htmlFor="password">password</label>
            <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
           placeholder="password"
           />
           <button 
           onClick={onLogin}
           >Signup here</button>
           <Link href='/signup'>Visit Signup </Link>
         
        </div>
    )

}