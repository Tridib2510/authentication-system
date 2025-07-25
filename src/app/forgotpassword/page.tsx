"use client"
import axios from "axios"
import React,{useState,useEffect} from "react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState("");

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    
    useEffect(()=>{
       if(email.length>0 && email.includes('@') && email.includes('.')){
        setButtonDisabled(false)
       }
    },[email])

    const forgotPassword=async()=>{
        console.log(email)
     await axios.post('/api/users/forgotpassword',{email:email})
    }

    return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Forgot Password</h1>
                <p className="mb-6 text-gray-600 text-center">
                    If you forgot your password, please contact support to reset it.
                </p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="button"
                        disabled={buttonDisabled}
                        onClick={forgotPassword}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
                            ${buttonDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
       )
}