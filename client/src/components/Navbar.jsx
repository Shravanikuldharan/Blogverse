import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../util";
import logo from "./../../public/blog-logo.gif";
import { FiEdit, FiHeart, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white py-3 px-4 md:px-8 rounded-2xl shadow-lg flex justify-between items-center sticky top-0 z-50">

      <div className="flex items-center gap-2 md:gap-3">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img
            src={logo}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm"
          />

          <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r 
            from-[#0077b6] to-[#00b4d8] text-transparent bg-clip-text tracking-wide">
            Blogverse
          </span>
        </Link>
      </div>

      {/* menu button */}
      <button
        className="cursor-pointer md:hidden text-2xl text-[#0077b6]"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <FiX /> : <FiMenu />}
      </button>

      {/* desktop view */}
      <div className="cursor-pointer hidden md:flex items-center gap-6 text-sm md:text-base">
        {user ? (
          <>
            <Link
              to="/new"
              className="flex items-center gap-2 text-[#0077b6] hover:bg-[#e3f5ff] px-3 md:px-4 py-1.5 rounded-md font-semibold transition"
            >
              <FiEdit className="text-lg" /> Create
            </Link>

            <Link
              to="/favourites"
              className="flex items-center gap-2 text-[#0077b6] hover:bg-[#e3f5ff] px-3 md:px-4 py-1.5 rounded-md font-semibold transition"
            >
              <FiHeart className="text-lg" /> Favorites
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] 
                text-white rounded-full flex items-center justify-center text-sm md:text-lg 
                shadow-md font-bold"
              >
                {user.name?.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-[#0077b6] font-semibold text-sm md:text-base">
                {user.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer bg-white border border-[#00b4d8] text-[#0077b6] 
              hover:bg-[#e3f5ff] px-3 md:px-4 py-1.5 rounded-md font-semibold transition"
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

      {/* mobile menu */}
      {openMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-2xl px-6 py-4 md:hidden flex flex-col gap-4">

          {user ? (
            <>
              <Link
                to="/new"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-[#0077b6] font-semibold hover:bg-[#e3f5ff] p-2 rounded-md"
              >
                <FiEdit /> Create
              </Link>

              <Link
                to="/favourites"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-[#0077b6] font-semibold hover:bg-[#e3f5ff] p-2 rounded-md"
              >
                <FiHeart /> Favorites
              </Link>

              <div className="flex items-center gap-3 border-t pt-3">
                <div className="w-9 h-9 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] 
                  text-white rounded-full flex items-center justify-center text-lg shadow-md font-bold">
                  {user.name?.substring(0, 1).toUpperCase()}
                </div>
                <span className="text-[#0077b6] font-semibold text-lg">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="cursor-pointer bg-white border border-[#00b4d8] text-[#0077b6] hover:bg-[#e3f5ff] px-4 py-2 rounded-md font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpenMenu(false)}
                className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white p-2 rounded-md text-center font-semibold shadow-md"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpenMenu(false)}
                className="border border-[#00b4d8] text-[#0077b6] hover:bg-[#e3f5ff] p-2 rounded-md text-center font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;