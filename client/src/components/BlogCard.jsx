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
  FaComment,
} from "react-icons/fa";
import '../index.css';
import { BLOG_CATEGORIES } from "../constants.js";

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
  const [commentCount, setCommentCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const categoryData = BLOG_CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === category?.toLowerCase()
  );
  const CategoryIcon = categoryData?.icon;
  const categoryImage = categoryData?.image;

  useEffect(() => {
    const increaseViewCount = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs/${slug}/view`);
      } catch (error) {
        console.error("Error increasing view count:", error);
      }
    };
    increaseViewCount();
  }, [slug]);

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

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`),
          axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`),
        ]);

        if (blogRes.data.success) {
          const blog = blogRes.data.data;
          setThumbCount(blog.thumbLikes || blog.totalThumbLikes || blog.likes || 0);
        }

        if (commentsRes.data?.comments) {
          setCommentCount(commentsRes.data.comments.length);
        }
      } catch (err) {
        console.error("Error fetching blog/comment count:", err);
      }
    };
    fetchBlogData();
  }, [slug]);

  const toggleHeart = async () => {
    if (!isLoggedIn || !localStorage.getItem("token")) {
      toast.error("You’ve been logged out. Please log in to use favorites");
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
          toast.success("Added to favorites ❤️", { duration: 1500 });
        } else {
          updatedLikes = storedLikes.filter((s) => s !== slug);
          toast("Removed from favorites 💔", { duration: 1500 });
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
        toast.success("You liked this post 👍", { duration: 1500 });
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
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden">
      <Toaster />

      <div className="relative w-full md:w-1/3 h-52 md:h-auto">
        <img
          src={categoryImage}
          alt={category}
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleHeart}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:scale-110 transition"
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            {status !== "published" && (
              <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-2">
                {status}
              </span>
            )}
            {title}
          </h2>

          {category && (
            <div className="inline-flex items-center gap-2 bg-pink-100 text-[#BE5985] px-3 py-1 rounded-full text-sm font-medium mb-4">
              {CategoryIcon && <CategoryIcon className="text-md" />}
              <span>{category}</span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#BE5985] text-white rounded-full font-semibold text-lg">
              {author.name.substring(0, 1)}
            </div>
            <div>
              <p className="font-medium text-gray-700">{author.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(publishedAt || updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-gray-600 mb-4">
          <button
            onClick={handleThumbLike}
            className="flex cursor-pointer items-center gap-1 hover:scale-110 transition-transform focus:outline-none"
          >
            {thumbLiked ? (
              <FaThumbsUp className="text-blue-600 text-lg" />
            ) : (
              <FaRegThumbsUp className="text-gray-500 text-lg hover:text-blue-600" />
            )}
            <span className="text-sm">{thumbCount}</span>
          </button>

          <span className="flex items-center gap-1 text-gray-500 text-sm">
            <FaComment className="text-green-600" /> {commentCount}
          </span>

          <span className="flex items-center gap-1 text-gray-500 text-sm">
            <FaEye className="text-[#BE5985]" /> {viewCount || 0}
          </span>
        </div>

        {status === "published" ? (
          <Link
            to={`/blog/${slug}`}
            className="inline-block bg-[#BE5985] text-white px-5 py-2 rounded-md text-sm hover:bg-[#a94d75] transition self-start"
          >
            Read Blog
          </Link>
        ) : (
          <Link
            to={`/edit/${slug}`}
            className="inline-block bg-gray-700 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition self-start"
          >
            Edit Blog
          </Link>
        )}
      </div>
    </div>
  );
}

export default BlogCard;