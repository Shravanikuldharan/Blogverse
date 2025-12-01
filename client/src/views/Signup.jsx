import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import signupImg from "../assets/signup.png";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const signupUser = async () => {
    let hasError = false;

    if (!user.name.trim()) {
      setNameError(true);
      hasError = true;
    }

    if (!user.email.trim()) {
      setEmailError(true);
      hasError = true;
    }

    if (!passwordRegex.test(user.password)) {
      setPassError(true);
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response.data.success) {
        toast.success("User registered successfully!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      toast.error("Signup failed! Please try again.");
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fff] overflow-hidden">
      <Toaster />

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 bg-white">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
            Blogverse
          </span>
        </h1>

        <p className="text-gray-500 mb-8 text-sm md:text-base text-center">
          Let’s begin your blogging journey with{" "}
          <span className="font-semibold text-[#0077b6]">Blogverse!</span>
        </p>

        <div className="w-full max-w-md bg-white p-8 space-y-7">

          <div className="space-y-1">
            <div className="relative group">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border 
                ${nameError ? "border-red-500" : "border-gray-300"}
                shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all`}
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                  setNameError(false);
                }}
              />
            </div>
            {nameError && (
              <p className="text-red-500 text-sm mt-1">* Name is required.</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border 
                ${emailError ? "border-red-500" : "border-gray-300"}
                shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all`}
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  setEmailError(false);
                }}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">* Email is required.</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/70 border 
                ${passError ? "border-red-500" : "border-gray-300"}
                shadow-sm focus:ring-2 focus:ring-[#00b4d8] outline-none transition-all`}
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  setPassError(false);
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            {passError && (
              <p className="text-red-500 text-sm mt-1">
                * Password must contain uppercase, lowercase, number & special character.
              </p>
            )}
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
        <img src={signupImg} className="w-[70%] h-auto object-contain" />
      </div>
    </div>
  );
}

export default Signup;