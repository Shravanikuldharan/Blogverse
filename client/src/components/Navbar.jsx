import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../util";

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
        <nav className="bg-gradient-to-r from-[#BE5985] via-[#DD88CF] to-[#F8E7F6] text-white py-3 px-6 rounded-2xl mb-6 shadow-lg flex justify-between items-center transition-all">
            <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-90 transition"
            >
                <img
                    src="/src/assets/blog-logo.png"
                    alt="logo"
                    className="w-8 h-8 rounded-full shadow-sm"
                />
                <span className="text-xl font-bold tracking-wide drop-shadow">
                    Blogverse
                </span>
            </Link>

            <div className="flex items-center gap-4 text-sm md:text-base">
                {user ? (
                    <>
                        <Link
                            to="/new"
                            className="bg-white text-[#BE5985] hover:bg-[#F8E7F6] px-4 py-1.5 rounded-md font-medium transition-all duration-300"
                        >
                            Create
                        </Link>

                        {/* Favorites */}
                        <Link
                            to="/favourites"
                            className="bg-white text-[#BE5985] hover:bg-[#F8E7F6] px-4 py-1.5 rounded-md font-medium transition-all duration-300"
                        >
                            Favorites
                        </Link>

                        {/*User Profile */}
                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-md">
                            <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#BE5985] text-white font-semibold rounded-full text-lg shadow-sm">
                                {user.name?.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="font-medium text-[#BE5985] capitalize">
                                {user.name}
                            </span>
                        </div>

                        {/*logout */}
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer bg-white text-[#BE5985] hover:bg-[#F8E7F6] px-4 py-1.5 rounded-md font-medium transition-all duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {/* login / Signup when logged out */}
                        <Link
                            to="/login"
                            className="bg-white text-[#BE5985] px-4 py-1.5 rounded-md font-medium hover:bg-[#F8E7F6] transition-all"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="bg-transparent border border-white px-4 py-1.5 rounded-md font-medium hover:bg-white hover:text-[#BE5985] transition-all"
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