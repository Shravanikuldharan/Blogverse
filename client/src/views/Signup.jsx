import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import signupImg from "../assets/signup.png";

import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const signupUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response.data.success) {
        console.log("Signup success:", response.data);
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff] overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 relative overflow-hidden bg-white">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
            Blogverse
          </span>
        </h1>

        <p className="text-gray-500 mb-8 text-sm md:text-base text-center">
          Let’s begin your blogging journey with <span className="font-semibold text-[#0077b6]">Blogverse !</span>
        </p>

        <div className="w-full max-w-md bg-white p-8 space-y-7">

          <div className="space-y-1">
            <div className="relative group">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#00b4d8]" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#00b4d8]" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg transition group-focus-within:text-[#00b4d8]" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/70 border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00b4d8] transition text-xl"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            onClick={signupUser}
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white rounded-xl text-lg font-bold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Create Account
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0077b6] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#F0FAFF]">
        <img
          src={signupImg}
          className="w-[70%] h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Signup;