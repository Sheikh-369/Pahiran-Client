import Link from "next/link";
import React from "react";

function UserLoginForm() {
  return (
    <div>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Login Form</title>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        body {\n            box-sizing: border-box;\n        }\n        \n        .form-container {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100%;\n        }\n        \n        .input-group {\n            position: relative;\n        }\n        \n        .input-field {\n            transition: all 0.3s ease;\n        }\n        \n        .input-field:focus {\n            transform: translateY(-2px);\n            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n        }\n        \n        .error-message {\n            opacity: 0;\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n        }\n        \n        .error-message.show {\n            opacity: 1;\n            transform: translateY(0);\n        }\n        \n        .success-animation {\n            animation: slideInUp 0.5s ease-out;\n        }\n        \n        @keyframes slideInUp {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        \n        .loading-spinner {\n            animation: spin 1s linear infinite;\n        }\n        \n        @keyframes spin {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n        }\n        \n        .remember-checkbox:checked {\n            background-color: #4f46e5;\n            border-color: #4f46e5;\n        }\n        \n        .social-btn {\n            transition: all 0.2s ease;\n        }\n        \n        .social-btn:hover {\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n        }\n    ",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: "@view-transition { navigation: auto; }",
          }}
        />
        <div className="form-container flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Form Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="h-8 w-8 text-indigo-600"
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
              <h2
                className="mt-6 text-3xl font-extrabold text-white"
                id="form-title"
              >
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-indigo-100" id="form-subtitle">
                Sign in to your account
              </p>
            </div>
            {/* Login Form */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  className="social-btn w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />{" "}
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />{" "}
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />{" "}
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>{" "}
                  Continue with Google{" "}
                </button>{" "}
                <button
                  type="button"
                  className="social-btn w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>{" "}
                  Continue with Facebook{" "}
                </button>
              </div>
              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>
              <form id="login-form" className="space-y-6">
                {/* Email Field */}
                <div className="input-group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="error-message text-red-500 text-sm mt-1"
                    id="email-error"
                  />
                </div>
                {/* Password Field */}
                <div className="input-group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      placeholder="Enter your password"
                    />{" "}
                    <button
                      type="button"
                      id="toggle-password"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        id="eye-icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />{" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="error-message text-red-500 text-sm mt-1"
                    id="password-error"
                  />
                </div>
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="remember-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />{" "}
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/auth/forgot-password"
                      className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                      id="forgot-password-link"
                    >
                      {" "}
                      <span id="forgot-password-text">
                        Forgot your password?
                      </span>{" "}
                    </Link>
                  </div>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    id="submit-btn"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                  >
                    {" "}
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>{" "}
                    <span id="submit-text">Sign In</span>
                    <svg
                      className="hidden loading-spinner ml-2 h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="loading-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              {/* Success Message */}
              <div
                className="hidden success-animation bg-green-50 border border-green-200 rounded-lg p-4 mt-6"
                id="success-message"
              >
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p
                      className="text-sm font-medium text-green-800"
                      id="success-text"
                    >
                      Welcome back! Login successful.
                    </p>
                  </div>
                </div>
              </div>
              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  <Link
                    href="/auth/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    id="signup-link"
                  >
                    {" "}
                    <span id="signup-link-text">
                      Don't have an account? Sign up
                    </span>{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoginForm;
