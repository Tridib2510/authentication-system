// If we are creating a file for frontend then we have to use page.tsx
"use client"


import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast,{Toaster} from 'react-hot-toast'
export default function LoginPage(){
    const router=useRouter()
   const [user,setUser]=React.useState({
        email:"",
        password:""
        
    })
   const [buttonDisabled,setButtonDisabled]=React.useState(false)
   const [loading,setLoading]=React.useState(false)

   

   const onLogin=async()=>{
      try {
        setLoading(true)
      const response=  await axios.post("/api/users/login",user)
    console.log("Login success",response.data)
    toast.success("Login success")
    router.push("/profile") 
    
    } catch (error:any) {
        console.log("Login failed",error.message)
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
   }
   useEffect(()=>{
     if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
     }
     else{
        setButtonDisabled(true)
     }
   },[user])

    return(
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                {loading ? "Processing..." : "Login"}
            </h1>
            <hr className="mb-6" />
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
                        ${buttonDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    onClick={onLogin}
                    type="button"
                    disabled={buttonDisabled}
                >
                    Login
                </button>
            </form>
            <div className="mt-4 text-center">
                <Link href='/signup' className="text-blue-600 hover:underline">
                    Visit Signup
                </Link>
            </div>
             <div className="mt-4 text-center">
                <Link href='/forgotpassword' className="text-blue-600 hover:underline">
                    Forgot password?
                </Link>
            </div>
        </div>
    </div>
)
    

}