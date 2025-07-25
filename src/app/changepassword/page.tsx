"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import {toast} from 'react-hot-toast';
import Link from "next/link";
export default function ChangePasswordPage() {
    const router=useRouter()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const changepassword=async()=>{
        
        const urlToken=window.location.search.split('=')[1]

        try {
            if( password !== confirmPassword) {
               toast.error('Password and confirm password do not match')
            }
            await axios.post('/api/users/changepassword',{token:urlToken,password:password})
            toast.success('Password changed successfully')
            router.push('/login')

            
        } catch (error:any) {
          console.log(error)
        }

    }

    useEffect(()=>{
        if (password.length > 0 && confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    },[password,confirmPassword])

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Change Password</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="button"
                        disabled={buttonDisabled}
                        onClick={changepassword}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
                            ${buttonDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

