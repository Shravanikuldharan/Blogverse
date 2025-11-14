import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../util";
import logo from "./../../public/blog-logo.gif";
import { FiEdit, FiHeart } from "react-icons/fi";

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
    <nav className="bg-white py-4 px-8 rounded-2xl shadow-lg flex justify-between items-center">

      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            className="w-10 h-10 rounded-full shadow-sm"
          />

          <span className="text-2xl font-extrabold bg-gradient-to-r 
            from-[#0077b6] to-[#00b4d8] text-transparent bg-clip-text tracking-wide">
            Blogverse
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm md:text-base">
        {user ? (
          <>
            <Link
              to="/new"
              className="flex items-center gap-2 text-[#0077b6] hover:bg-[#e3f5ff] px-4 py-1.5 rounded-md font-semibold transition"
            >
              <FiEdit className="text-lg" /> Create
            </Link>

            <Link
              to="/favourites"
              className="flex items-center gap-2 text-[#0077b6] hover:bg-[#e3f5ff] px-4 py-1.5 rounded-md font-semibold transition"
            >
              <FiHeart className="text-lg" /> Favorites
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white rounded-full flex items-center justify-center text-lg shadow-md font-bold">
                {user.name?.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-[#0077b6] font-medium">{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer bg-white border border-[#00b4d8] text-[#0077b6] hover:bg-[#e3f5ff] px-4 py-1.5 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-4 py-1.5 rounded-md font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-[#00b4d8] text-[#0077b6] hover:bg-[#e3f5ff] px-4 py-1.5 rounded-md font-semibold transition"
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