import React from "react";
import { Link } from "react-router"; // corrected import

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#F8E7F6] via-[#DD88CF] to-[#BE5985] text-center text-gray-800 px-6 relative overflow-hidden">
      {/* Decorative circles */}


      <div className="z-10">
        <h1 className="text-[120px] font-extrabold text-white drop-shadow-lg leading-none mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-3">Oops! Page Not Found</h2>
        <p className="max-w-md mx-auto text-gray-700 mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-white text-[#BE5985] hover:font-bold shadow-md transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      
    </div>
  );
}

export default NotFound;
