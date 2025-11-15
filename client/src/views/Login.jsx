import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import loginImg from "../assets/login.png";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const loginUser = async () => {
    if (!acceptedTerms) {
      setTermsError(true);   // show red error
      return;
    }
    setTermsError(false); // clear error when acceptable
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );
      if (response?.data?.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed:", err);

      setLoginError(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F0FAFF] overflow-hidden">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#F0FAFF]">
        <img
          src={loginImg}
          className="w-[70%] h-auto object-contain"
        />
      </div>

      <div className="w-full bg-white md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 relative overflow-hidden">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
            Welcome Back!
          </span>
        </h1>

        <p className="text-gray-500 mb-8 text-sm md:text-base text-center">
          Access your <span className="font-semibold text-[#0077b6]">Blogverse</span> dashboard
        </p>

        <div className="w-full max-w-md bg-white p-8 space-y-7">
          <div className="space-y-1">
            <div className="relative group">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#00b4d8] transition" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border 
                ${loginError ? "border-red-500" : "border-gray-300"}
                shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all`}
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  setLoginError(false);
                }}
              />
            </div>
          </div>

          <div className="space-y-1">

            <div className="relative group">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg transition group-focus-within:text-[#00b4d8]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/70 border 
                ${loginError ? "border-red-500" : "border-gray-300"}
                shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all`}
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  setLoginError(false);
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00b4d8] transition text-xl"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mt-1">
                * Invalid email or password.
              </p>
            )}

          </div>

          <div className="flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded accent-[#0077b6] cursor-pointer"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                setTermsError(false); // remove red error when user checks
              }}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              I agree to the{" "}
              <span className="text-[#0077b6] font-semibold hover:underline">
                Terms & Conditions
              </span>
            </label>
          </div>

          {termsError && (
            <p className="text-red-500 text-sm mt-1">
              * Please accept Terms & Conditions before logging in.
            </p>
          )}

          <button
            onClick={loginUser}
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white rounded-xl text-lg font-bold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Login
          </button>

        </div>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#0077b6] font-bold hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;