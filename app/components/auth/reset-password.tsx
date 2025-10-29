"use client";

import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { forgotPassword, resetPassword } from "@/lib/store/auth/auth-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [resetPasswordData, setResetPasswordData] = useState<IUserData>({
    userEmail: "",
    OTP: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResending, setIsResending] = useState(false);

  //for OTP input auto-focus
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleResetPasswordDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordData({ ...resetPasswordData, [name]: value });
  };

  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits allowed
    e.target.value = value;

    const otpArray = (resetPasswordData.OTP || "").split("");
    otpArray[index] = value;
    const otpValue = otpArray.join("");

    setResetPasswordData({ ...resetPasswordData, OTP: otpValue });

    // auto move to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleResetPasswordSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(resetPassword(resetPasswordData));

    if (result.success) {
      toast.success(result.message);
      router.push("/auth/login");
    } else {
      toast.error(result.message);
    }
  };

  //for resend OTP code
  const handleResendCode = async () => {
  if (!resetPasswordData.userEmail) {
    toast.error("Please enter your email first.");
    return;
  }

  setIsResending(true);
  const result = await dispatch(forgotPassword({ userEmail: resetPasswordData.userEmail }) as any);

  if (result.success) {
    toast.success(result.message || "Verification code resent successfully!");
  } else {
    toast.error(result.message || "Failed to resend code.");
  }

  setIsResending(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 px-3 py-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm">
            <svg
              className="h-6 w-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Reset Password</h2>
          <p className="text-xs text-gray-500">Enter your code and new password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPasswordSubmission} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="userEmail"
                onChange={handleResetPasswordDataChange}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* OTP Code */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <div className="flex justify-between">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  name="OTP"
                  onChange={(e) => handleOTPChange(e, i)}
                  className="w-9 h-9 border border-gray-300 rounded-md text-center font-semibold text-sm focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-xs text-indigo-600 hover:underline disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                onChange={handleResetPasswordDataChange}
                required
                placeholder="Enter new password"
                className="w-full px-3 py-2 pl-9 pr-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7A9.97 9.97 0 016.99 6.99m2.013-1.479A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-3.408 4.066M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmNewPassword"
                onChange={handleResetPasswordDataChange}
                required
                placeholder="Confirm new password"
                className="w-full px-3 py-2 pl-9 pr-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7A9.97 9.97 0 016.99 6.99m2.013-1.479A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-3.408 4.066M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 "
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center text-xs text-gray-600">
          Remembered your password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
