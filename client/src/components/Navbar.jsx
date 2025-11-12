import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../util";
import logo from "./../../public/blog-logo.png";
import { FaUser, FaSignOutAlt, FaPen, FaHeart } from "react-icons/fa";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#F5EFFF] py-4 px-8 rounded-b-2xl flex justify-between items-center shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
        <span className="text-2xl font-bold text-[#BE5985]">Blogverse</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 text-sm md:text-base">
        {user ? (
          <>
            {/* Create Button */}
            <Link
              to="/new"
              className="text-[#BE5985] hover:bg-[#F8E7F6] hover:text-[#BE5985] px-4 py-1.5 rounded-md font-medium transition duration-300"
            >
              Create
            </Link>

            {/* Favorites Button */}
            <Link
              to="/favourites"
              className="text-[#BE5985] hover:bg-[#F8E7F6] hover:text-[#BE5985] px-4 py-1.5 rounded-md font-medium transition duration-300"
            >
              Favorites
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#BE5985] text-white rounded-full flex items-center justify-center text-lg">
                {user.name?.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-[#BE5985]">{user.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-white text-[#BE5985] hover:bg-[#F8E7F6] hover:text-[#BE5985] px-4 py-1.5 rounded-md font-medium transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <Link
              to="/login"
              className="bg-[#BE5985] text-white hover:bg-[#a94d75] px-4 py-1.5 rounded-md font-medium transition duration-300"
            >
              Login
            </Link>

            {/* Sign Up Button */}
            <Link
              to="/signup"
              className="border border-[#BE5985] text-[#BE5985] hover:bg-[#BE5985] hover:text-white px-4 py-1.5 rounded-md font-medium transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
