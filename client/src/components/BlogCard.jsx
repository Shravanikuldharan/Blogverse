import { Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaHeart,
  FaRegHeart,
  FaRegThumbsUp,
  FaEye,
  FaRegComment,
} from "react-icons/fa";
import "../index.css";
import { BLOG_CATEGORIES } from "../constants.js";
import { fetchWithCache } from "../utils/apiCache"; 

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
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogs/${slug}?view=true`)
      .catch(() => { });
  }, [slug]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(storedLikes.includes(slug));
  }, [slug]);

  // load blog & comments 
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          fetchWithCache(
            `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
            `cache_blog_${slug}`
          ),
          fetchWithCache(
            `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
            `cache_comments_${slug}`
          ),
        ]);

        if (blogRes?.success) {
          const blog = blogRes.data;
          setThumbCount(
            blog.thumbLikes || blog.totalThumbLikes || blog.likes || 0
          );
        }

        if (commentsRes?.comments) {
          setCommentCount(commentsRes.comments.length);
        }
      } catch (err) { }
    };

    fetchBlogData();
  }, [slug]);

  const toggleHeart = async () => {
    if (!isLoggedIn) {
      toast.error("You’ve been logged out. Please log in.");
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

        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        const updated = response.data.liked
          ? [...new Set([...stored, slug])]
          : stored.filter((s) => s !== slug);

        localStorage.setItem("favorites", JSON.stringify(updated));

        toast.success(
          response.data.liked
            ? "Added to favorites ❤️"
            : "Removed from favorites 💔"
        );
      }
    } catch (error) { }
  };

  const handleThumbLike = async () => {
    if (!isLoggedIn) {
      toast.error("You’ve been logged out. Please log in.");
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
        toast.success("You liked this post 👍");
      }
    } catch (error) { }
  };

 return (
  <div className="w-full flex justify-center">
    <Toaster />

    <div
      className="mt-12 relative bg-white rounded-3xl shadow-lg 
      border border-[#E8EEF4] overflow-hidden w-[95%] max-w-5xl my-2 flex flex-col md:flex-row"
    >
      <span
        className="absolute top-6 right-[-6px] flex items-center gap-1 px-3 py-1 text-[14px] font-semibold shadow-md"
        style={{
          backgroundColor: categoryData.bg,
          color: categoryData.text,
          borderRadius: "20px 0px 0px 20px",
        }}
      >
        {CategoryIcon && (
          <CategoryIcon
            className="text-[14px]"
            style={{ color: categoryData.iconColor }}
          />
        )}
        {category}
      </span>

      {/* img */}
      <div className="relative md:w-2/5 w-full h-60 md:h-auto group">
        <img
          src={categoryImage}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
        />

        {/* status */}
        {status !== "published" && (
          <span className="absolute top-3 right-3 bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            {status.toUpperCase()}
          </span>
        )}

        <button
          onClick={toggleHeart}
          className="cursor-pointer absolute top-3 left-3 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>
      </div>

      {/* right side */}
      <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">

        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white flex items-center justify-center 
            rounded-full text-lg font-bold shadow-sm"
          >
            {author.name.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="text-xs sm:text-lg font-semibold text-gray-800">{author.name}</p>
            <p className="text-xs sm:text-[16px] font-normal text-gray-600">{author.email}</p>
          </div>
        </div>

        {/* title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-[#0077b6] transition duration-400 mb-3">
          {title}
        </h2>

        <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs sm:text-[16px] text-gray-600 font-semibold flex-1">
            {new Date(publishedAt || updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <div className="flex items-center justify-center gap-4 text-xs sm:text-[16px] flex-1">
            <button
              onClick={handleThumbLike}
              className="flex cursor-pointer items-center gap-1 transition"
            >
              <FaRegThumbsUp className="text-[#0077b6]" />
              <span className="text-gray-700">{thumbCount}</span>
            </button>

            <span className="flex items-center gap-1">
              <FaRegComment className="text-[#0077b6]" />
              <span className="text-gray-700">{commentCount}</span>
            </span>

            <span className="flex items-center gap-1">
              <FaEye className="text-[#0077b6]" />
              <span className="text-gray-700">{viewCount || 0}</span>
            </span>
          </div>

          {/* btn */}
          <div className="flex justify-end flex-1">
            {status === "published" ? (
              <Link
                to={`/blog/${slug}`}
                className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8]
                  text-white text-xs px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] rounded-lg shadow-md hover:scale-[1.04] 
                  hover:shadow-lg transition font-semibold cursor-pointer"
              >
                Read More
              </Link>
            ) : (
              <Link
                to={`/edit/${slug}`}
                className="bg-gray-600 text-white px-4 py-1 sm:px-5 sm:py-2 rounded-lg 
                  shadow-md hover:bg-gray-700 transition font-semibold 
                  cursor-pointer"
              >
                Edit Blog
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default BlogCard;