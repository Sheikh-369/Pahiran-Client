import React from "react";

function ResetPasswordForm() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password Form</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            box-sizing: border-box;\n        }\n        \n        .form-container {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100%;\n        }\n        \n        .input-group {\n            position: relative;\n        }\n        \n        .input-field {\n            transition: all 0.3s ease;\n        }\n        \n        .input-field:focus {\n            transform: translateY(-2px);\n            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n        }\n        \n        .error-message {\n            opacity: 0;\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n        }\n        \n        .error-message.show {\n            opacity: 1;\n            transform: translateY(0);\n        }\n        \n        .success-animation {\n            animation: slideInUp 0.5s ease-out;\n        }\n        \n        @keyframes slideInUp {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        \n        .loading-spinner {\n            animation: spin 1s linear infinite;\n        }\n        \n        @keyframes spin {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n        }\n        \n        .back-btn {\n            transition: all 0.2s ease;\n        }\n        \n        .back-btn:hover {\n            transform: translateX(-2px);\n        }\n        \n        .otp-input {\n            width: 3rem;\n            height: 3rem;\n            text-align: center;\n            font-size: 1.25rem;\n            font-weight: 600;\n        }\n        \n        .strength-meter {\n            height: 4px;\n            background: #e5e7eb;\n            border-radius: 2px;\n            overflow: hidden;\n            margin-top: 8px;\n        }\n        \n        .strength-fill {\n            height: 100%;\n            transition: all 0.3s ease;\n            border-radius: 2px;\n        }\n        \n        .info-box {\n            background: rgba(79, 70, 229, 0.1);\n            border: 1px solid rgba(79, 70, 229, 0.2);\n        }\n    ",
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
                  d="M15 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />{" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <h2
              className="mt-6 text-3xl font-extrabold text-white"
              id="form-title"
            >
              Reset Your Password
            </h2>
            <p className="mt-2 text-sm text-indigo-100" id="form-subtitle">
              Enter the code sent to your email and create a new password
            </p>
          </div>
          {/* Reset Password Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            {/* Info Box */}
            <div className="info-box rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="shrink-0">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-800">
                    Check your email for a 6-digit verification code. The code
                    expires in 15 minutes.
                  </p>
                </div>
              </div>
            </div>
            <form id="reset-password-form" className="space-y-6">
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
                    placeholder="Enter your email address"
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
              {/* OTP Field */}
              <div className="input-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="flex justify-center space-x-2 mb-2">
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-1"
                  />{" "}
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-2"
                  />{" "}
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-3"
                  />{" "}
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-4"
                  />{" "}
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-5"
                  />{" "}
                  <input
                    type="text"
                    maxLength={1}
                    className="otp-input input-field border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="otp-6"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                    id="resend-code"
                  >
                    {" "}
                    Didn't receive the code? Resend{" "}
                  </button>
                </div>
                <div
                  className="error-message text-red-500 text-sm mt-1"
                  id="otp-error"
                />
              </div>
              {/* New Password Field */}
              <div className="input-group">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    required
                    className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    placeholder="Enter your new password"
                  />{" "}
                  <button
                    type="button"
                    id="toggle-new-password"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="new-eye-icon"
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
                <div className="strength-meter">
                  <div className="strength-fill" id="strength-fill" />
                </div>
                <div className="text-xs text-gray-500 mt-1" id="strength-text">
                  Password strength
                </div>
                <div
                  className="error-message text-red-500 text-sm mt-1"
                  id="new-password-error"
                />
              </div>
              {/* Confirm Password Field */}
              <div className="input-group">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                    className="input-field appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    placeholder="Confirm your new password"
                  />{" "}
                  <button
                    type="button"
                    id="toggle-confirm-password"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      id="confirm-eye-icon"
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
                  id="confirm-password-error"
                />
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
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>{" "}
                  <span id="submit-text">Reset Password</span>
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
                  <h3 className="text-sm font-medium text-green-800">
                    Success!
                  </h3>
                  <p className="text-sm text-green-700 mt-1" id="success-text">
                    Password reset successfully!
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    You can now sign in with your new password.
                  </p>
                </div>
              </div>
            </div>
            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <a
                href="#"
                className="back-btn inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200"
                id="back-to-login"
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span id="back-to-login-text">Back to Sign In</span>{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
