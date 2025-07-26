export default function Login({ isProfileOpen, toggleProfile, handleLogin }) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-1/2 
          w-11/12 max-w-md sm:w-96 bg-yellow/90
           rounded-l-2xl z-50 transition-all backdrop-blur-md
           duration-300 ease-in-out ${
             isProfileOpen
               ? "transform translate-x-0"
               : "transform translate-x-full"
           }`}>
        <div className="flex flex-col h-full">
          {/* header */}
          <div className="flex justify-end items-center p-6">
            <button
              onClick={toggleProfile}
              className="text-almostblack font-redhatmono text-sm cursor-pointer">
              close
            </button>
          </div>

          {/* login form */}
          <div className="flex-1 overflow-y-auto p-6 font-redhatmono">
            <div className="space-y-6">
              {/* email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors te "
                />
              </div>

              {/* password input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* login button */}
              <div className="flex justify-center">
                <button
                  onClick={handleLogin}
                  className="w-min rounded-2xl py-3 px-4 hover:bg-blue-600 text-black hover:text-white transition-colors font-medium cursor-pointer duration-300">
                  Login
                </button>
              </div>

              {/* login with google */}
              <button className="w-full py-3 px-4 border rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700">Login with Google</span>
              </button>

              {/* forgot password link */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot your password?
                </a>
              </div>

              {/* sign up link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 
          transition-all duration-500 ease-in-out"
          onClick={toggleProfile}></div>
      )}
    </>
  );
}
