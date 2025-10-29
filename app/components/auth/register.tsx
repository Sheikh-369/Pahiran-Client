'use client'
import { userRegister } from '@/lib/store/auth/auth-slice'
import { IUserData } from '@/lib/store/auth/auth-slice-type'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

function UserRegister() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [userData, setUserData] = useState<IUserData>({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    userPhoneNumber: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleUserDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await dispatch(userRegister(userData))

    if (result.success) {
      toast.success(result.message)
      router.push("/auth/login")
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 px-3 py-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-sm p-5 space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm">
            <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-xs text-gray-500">Join us and get started quickly</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUserDataSubmission} className="space-y-3">
          {/* Username */}
          <InputField
            label="Username"
            name="userName"
            placeholder="Enter your username"
            iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            onChange={handleUserDataChange}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            name="userEmail"
            type="email"
            placeholder="Enter your email"
            iconPath="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206A8.959 8.959 0 0112 20"
            onChange={handleUserDataChange}
          />

          {/* Password */}
          <PasswordField
            label="Password"
            name="userPassword"
            placeholder="Enter password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={handleUserDataChange}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm password"
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            onChange={handleUserDataChange}
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="userPhoneNumber"
            placeholder="Enter phone number"
            iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            onChange={handleUserDataChange}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <svg className="h-4 w-4 mr-2 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
            </svg>
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserRegister

// 🧩 Input Field Component
function InputField({ label, name, placeholder, type = "text", iconPath, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <span className="absolute left-2.5 top-2.5 text-gray-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </span>
      </div>
    </div>
  )
}

// 🔐 Password Field Component with Eye Toggle
function PasswordField({ label, name, placeholder, show, toggle, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full px-3 py-2 pl-9 pr-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <span className="absolute left-2.5 top-2.5 text-gray-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" />
          </svg>
        </span>
        <button
          type="button"
          onClick={toggle}
          className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
        >
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7A9.97 9.97 0 016.99 6.99m2.013-1.479A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-3.408 4.066M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
