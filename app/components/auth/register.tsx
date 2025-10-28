'use client'
import { userRegister } from '@/lib/store/auth/auth-slice'
import { IUserData } from '@/lib/store/auth/auth-slice-type'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

function UserRegister() {
    const router=useRouter()
    const dispatch=useAppDispatch()
    const[userData,setUserData]=useState<IUserData>({
        userName:"",
        userEmail:"",
        userPassword:"",
        confirmPassword:"",
        userPhoneNumber:""
    })

    const handleUserDataCahnge=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setUserData({
            ...userData,
            [name]:value
        })
    }

    const handleUserDataSubmission=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const result=await dispatch(userRegister(userData))

        //for toast messages
        if (result.success) {
            toast.success(result.message)
            router.push("/auth/login")
        } else {
            toast.error(result.message)
        }

    }

  return (
    <div>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Registration Form</title>
    <style dangerouslySetInnerHTML={{__html: "\n        body {\n            box-sizing: border-box;\n        }\n        \n        .form-container {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100%;\n        }\n        \n        .input-group {\n            position: relative;\n        }\n        \n        .input-field {\n            transition: all 0.3s ease;\n        }\n        \n        .input-field:focus {\n            transform: translateY(-2px);\n            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n        }\n        \n        .error-message {\n            opacity: 0;\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n        }\n        \n        .error-message.show {\n            opacity: 1;\n            transform: translateY(0);\n        }\n        \n        .success-animation {\n            animation: slideInUp 0.5s ease-out;\n        }\n        \n        @keyframes slideInUp {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        \n        .loading-spinner {\n            animation: spin 1s linear infinite;\n        }\n        \n        @keyframes spin {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n        }\n        \n        .strength-meter {\n            height: 4px;\n            background: #e5e7eb;\n            border-radius: 2px;\n            overflow: hidden;\n            margin-top: 8px;\n        }\n        \n        .strength-fill {\n            height: 100%;\n            transition: all 0.3s ease;\n            border-radius: 2px;\n        }\n    " }} />
    <style dangerouslySetInnerHTML={{__html: "@view-transition { navigation: auto; }" }} />
    <div className="form-container flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">{/* Form Header */}
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white" id="form-title">Create Your Account</h2>
            <p className="mt-2 text-sm text-indigo-100" id="form-subtitle">Join us today and get started</p>
        </div>{/* Registration Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
            <form onSubmit={handleUserDataSubmission} id="registration-form" className="space-y-6">{/* Username Field */}
            <div className="input-group"><label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                <div className="relative">
                    <input type="text" id="userName" 
                    name="userName"
                    onChange={handleUserDataCahnge}
                    required className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Enter your username" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                </div>
                <div className="error-message text-red-500 text-sm mt-1" id="username-error" />
            </div>{/* Email Field */}
            <div className="input-group"><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                    <input 
                    type="email" id="email" 
                    name="userEmail"
                    onChange={handleUserDataCahnge}
                    required className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Enter your email" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                </div>
                </div>
                <div className="error-message text-red-500 text-sm mt-1" id="email-error" />
            </div>{/* Password Field */}
            <div className="input-group"><label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                    <input type="password" id="password" 
                    name="userPassword"
                    onChange={handleUserDataCahnge}
                    required className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Enter your password" /> <button type="button" id="toggle-password" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="eye-icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg></button>
                </div>
                <div className="strength-meter">
                <div className="strength-fill" id="strength-fill" />
                </div>
                <div className="text-xs text-gray-500 mt-1" id="strength-text">
                Password strength
                </div>
                <div className="error-message text-red-500 text-sm mt-1" id="password-error" />
            </div>{/* Confirm Password Field */}
            <div className="input-group"><label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                    <input 
                    type="password" id="confirm-password" 
                    name="confirmPassword"
                    onChange={handleUserDataCahnge}
                    required className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Confirm your password" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                </div>
                <div className="error-message text-red-500 text-sm mt-1" id="confirm-password-error" />
            </div>{/* Phone Number Field */}
            <div className="input-group"><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                    <input 
                    type="text" id="phone" 
                    name="userPhoneNumber"
                    onChange={handleUserDataCahnge}
                    required className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Enter your phone number" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                </div>
                <div className="error-message text-red-500 text-sm mt-1" id="phone-error" />
            </div>{/* Submit Button */}
            <div><button type="submit" id="submit-btn" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"> <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg></span> <span id="submit-text">Create Account</span>
                <svg className="hidden loading-spinner ml-2 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="loading-icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg></button>
            </div>
            </form>{/* Success Message */}
            <div className="hidden success-animation bg-green-50 border border-green-200 rounded-lg p-4 mt-6" id="success-message">
            <div className="flex">
                <div className="shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                </div>
                <div className="ml-3">
                <p className="text-sm font-medium text-green-800" id="success-text">Account created successfully!</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default UserRegister
