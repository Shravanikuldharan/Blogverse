import { Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
  FaRegThumbsUp,
  FaEye,
} from "react-icons/fa";

function BlogCard({
  _id,
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
  initialThumbLikes = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [thumbLiked, setThumbLiked] = useState(false);
  const [thumbCount, setThumbCount] = useState(initialThumbLikes);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(storedLikes.includes(slug));
  }, [slug]);

  const toggleHeart = async () => {
    if (!isLoggedIn || !localStorage.getItem("token")) {
      toast.error("You’ve been logged out. Please log in to use favorites ❤️");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setLiked(response.data.liked);

        const storedLikes = JSON.parse(localStorage.getItem("favorites")) || [];
        let updatedLikes;

        if (response.data.liked) {
          updatedLikes = [...new Set([...storedLikes, slug])];
          toast.success("Added to favorites❤️", { duration: 1500 });
        } else {
          updatedLikes = storedLikes.filter((s) => s !== slug);
          toast("Removed from favorites💔", { duration: 1500 });
        }

        localStorage.setItem("favorites", JSON.stringify(updatedLikes));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again", { duration: 2000 });
        localStorage.clear();
        setIsLoggedIn(false);
      } else {
        toast.error("Error toggling favorite.", { duration: 2000 });
      }
    }
  };

  const handleThumbLike = async () => {
    if (!isLoggedIn || !localStorage.getItem("token")) {
      toast.error("You’ve been logged out. Please log in to like");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/thumb-like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setThumbLiked(true);
        setThumbCount(response.data.totalThumbLikes);
        toast.success("You liked this post👍", { duration: 1500 });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again");
        localStorage.clear();
        setIsLoggedIn(false);
      } else {
        toast.error("Error increasing like count.");
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6">
      <Toaster />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          {status !== "published" && (
            <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-2">
              {status}
            </span>
          )}
          {title}
        </h2>
        <span className="bg-pink-200 text-[#BE5985] text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-[40px] h-[40px] bg-orange-400 text-white rounded-full font-semibold text-lg">
          {author.name.substring(0, 1)}
        </div>
        <div>
          <p className="font-medium text-gray-700">{author.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(publishedAt || updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-gray-600 mb-4">
        <button
          onClick={toggleHeart}
          className="flex items-center gap-1 hover:scale-110 transition-transform focus:outline-none"
          title={liked ? "Remove from Favorites" : "Add to Favorites"}
        >
          {liked ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg hover:text-red-400" />
          )}
        </button>

        <button
          onClick={handleThumbLike}
          className="flex items-center gap-1 hover:scale-110 transition-transform focus:outline-none"
        >
          {thumbLiked ? (
            <FaThumbsUp className="text-blue-600 text-lg" />
          ) : (
            <FaRegThumbsUp className="text-gray-500 text-lg hover:text-blue-600" />
          )}
          <span className="text-sm">{thumbCount}</span>
        </button>

        <span className="flex items-center gap-1 text-gray-500 text-sm">
          <FaEye className="text-pink-500" /> {viewCount || 0}
        </span>
      </div>

      {status === "published" ? (
        <Link
          to={`/blog/${slug}`}
          className="inline-block bg-[#BE5985] text-white px-5 py-2 rounded-md text-sm hover:bg-[#a94d75] transition"
        >
          Read Blog
        </Link>
      ) : (
        <Link
          to={`/edit/${slug}`}
          className="inline-block bg-gray-700 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition"
        >
          Edit Blog
        </Link>
      )}
    </div>
  );
}

export default BlogCard;