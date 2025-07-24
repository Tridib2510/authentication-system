"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect,useState } from "react"

export default function verifyEmailPage(){
    const [token,setToken]=useState('')
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)

    const verifyUserEmail=async()=>{
       try {
        // sending request from axios
      await  axios.post('/api/users/verifyemail',{token})
    setVerified(true)  
    
    } catch (error:any) {
        setError(true);
        console.log(error.response.data)
        
       }
    }

    useEffect(()=>{
//    As soon as someone lands on our page we want to
// extract the url
const urlToken=window.location.search.split('=')[1]
setToken(urlToken || "")//setting token back to empty string i urlToken is undefined

    },[token])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])


 return(
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ?`${token}`:"no token"}</h2>
   {/*If we are verified then we show this  */}
   {verified && (
      <div>
        <h2 className="text-2xl">Email Verified</h2>
        <Link href="/login">
       Login
        </Link>
      </div>
   )}
   {error && (
    <div>
        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        <Link href="/Login">
        Login 
        </Link>
    </div>
   )}
   
    </div>
 )

}