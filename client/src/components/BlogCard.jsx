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
import "../index.css";
import { BLOG_CATEGORIES } from "../constants.js";

function BlogCard({
  _id,
  title,
  author,
  shortDescription,
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
    axios.post(`${import.meta.env.VITE_API_URL}/blogs/${slug}/view`).catch(() => { });
  }, [slug]);

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
          response.data.liked ? "Added to favorites ❤️" : "Removed from favorites 💔"
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

      <div className="relative bg-white rounded-3xl shadow-lg hover:scale-[1.01] transition-transform duration-300
      border border-[#E8EEF4] overflow-hidden w-[95%] max-w-5xl my-8 flex flex-col md:flex-row">

        {/* category */}
        <span
          className="absolute top-6 right-[-6px] flex items-center gap-1 px-3 py-1 text-xs font-medium shadow-md"
          style={{
            backgroundColor: categoryData.bg,
            color: categoryData.text,
            // border: `0.1px solid ${categoryData.text}`,
            borderRadius: "20px 0px 0px 20px"
          }}
        >
          {CategoryIcon && (
            <CategoryIcon
              className="text-sm"
              style={{ color: categoryData.iconColor }}
            />
          )}
          {category}
        </span>


        {/* img */}
        <div className="relative md:w-2/5 w-full h-60 md:h-auto group">
          <img
            src={categoryImage}
            alt={category}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
          />

          {/* ststus */}
          {status !== "published" && (
            <span className="absolute top-3 right-3 bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">
              {status.toUpperCase()}
            </span>
          )}

          <button
            onClick={toggleHeart}
            className="cursor-pointer absolute top-3 left-3 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
          >
            {liked ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-600 text-xl" />}
          </button>
        </div>

        {/* right side */}
        <div className="p-6 flex flex-col justify-between flex-1">

          {/* author */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white flex items-center justify-center 
              rounded-full text-lg font-semibold shadow-sm">
              {author.name.substring(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{author.name}</p>
              <p className="font-normal text-gray-600">{author.email}</p>
            </div>
          </div>

          {/* title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
          
          {/* date | stats | button */}
          <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-gray-200">

            <span className="text-gray-600 text-sm flex-1">
              {new Date(publishedAt || updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <div className="flex items-center justify-center gap-6 text-gray-500 text-sm flex-1">
              <button
                onClick={handleThumbLike}
                className="flex items-center gap-1 hover:text-[#00A9FF] transition"
              >
                {thumbLiked ? <FaThumbsUp className="text-[#00A9FF]" /> : <FaRegThumbsUp />}
                {thumbCount}
              </button>

              <span className="flex items-center gap-1">
                <FaComment className="text-green-600" /> {commentCount}
              </span>

              <span className="flex items-center gap-1">
                <FaEye className="text-[#00A9FF]" /> {viewCount || 0}
              </span>
            </div>

            <div className="flex justify-end flex-1">
              {status === "published" ? (
                <Link
                  to={`/blog/${slug}`}
                  className="bg-gradient-to-r from-[#00A9FF] to-[#89CFF3]
                    text-white px-5 py-2 rounded-lg shadow-md hover:scale-[1.03] 
                    hover:shadow-lg transition font-medium"
                >
                  Read More
                </Link>
              ) : (
                <Link
                  to={`/edit/${slug}`}
                  className="bg-gray-700 text-white px-5 py-2 rounded-lg 
                     shadow-md hover:bg-gray-800 transition font-medium"
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