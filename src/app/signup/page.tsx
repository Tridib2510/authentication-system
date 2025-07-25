// 

"use client"
//This becomes a client component
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast,{Toaster} from "react-hot-toast"

export default function SignupPage(){

    const router=useRouter()

    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
   
  const [buttonDisabled,setButtonDisabled]=React.useState(false)
  const [loading,setloading]=React.useState(false)

   const onSignup=async()=>{
      try {
        setloading(true)
     const response =  await axios.post("/api/users/signup",user)

toast.success('Successfully toasted!')

     console.log('Signup success')
//pushing the user to a new page
  router.push("/login")
      } catch (error:any) {
        console.log('Signup failed')
        toast.error(error.message)
      }
      finally{
      setloading(false)
      }
   }
   
   useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
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
                {loading ? "Processing..." : "Signup"}
            </h1>
            <hr className="mb-6" />
            <form className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
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
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
                        ${buttonDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    onClick={onSignup}
                    type="button"
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>
            </form>
            <div className="mt-4 text-center">
                <Link href='/login' className="text-blue-600 hover:underline">
                    Visit Login Page
                </Link>
            </div>
        </div>
    </div>
    )
}