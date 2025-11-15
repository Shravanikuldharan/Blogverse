import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaEye,
  FaRegComment,
} from "react-icons/fa";
import { BLOG_CATEGORIES } from "../constants";
import Footer from "../components/Footer";
import "../index.css";

function ReadBlog() {
  const { slug } = useParams();

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [thumbLiked, setThumbLiked] = useState(false);
  const [thumbCount, setThumbCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const hasViewed = useRef(false);

  const categoryData = BLOG_CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === blog?.category?.toLowerCase()
  );

  // fetch blog by view = +1
  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}?view=true`
      );

      const data = res.data.data;

      setBlog(data);
      setThumbCount(
        data.thumbLikes || data.totalThumbLikes || data.likes || 0
      );
      // remove stale cache
      localStorage.removeItem(`cache_blog_${slug}`);
    } catch (err) {
      console.log("Error loading blog:", err);
    }
  };

  const loadComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`
      );
      setComments(res.data.comments || []);
    } catch (err) {
      console.log("Error loading comments:", err);
    }
  };

  useEffect(() => {
    if (!hasViewed.current) {
      fetchBlog();
      loadComments();
      hasViewed.current = true;
    }
  }, []);

  const handleThumbLike = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to like 👍");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/thumb-like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setThumbLiked(true);
        setThumbCount(response.data.totalThumbLikes);
        toast.success("You liked this post 👍");
      }
    } catch {
      toast.error("Error liking post");
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Comment added!");
      setNewComment("");
      loadComments();
    } catch {
      toast.error("Login required to comment");
    }
  };

  return (
    <>
      <div className="p-4 pb-6 bg-[#F0FAFF]">
        <Navbar />
        <Toaster />
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-3xl shadow-lg border border-[#E8EEF4] overflow-hidden">
          {/* img */}
          <div className="relative h-56 sm:h-72 md:h-80 group">
            <img
              src={categoryData?.image}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {categoryData && (
              <span
                className="absolute top-6 right-[-6px] px-4 py-1 flex items-center gap-2 shadow-md font-semibold"
                style={{
                  backgroundColor: categoryData.bg,
                  color: categoryData.text,
                  borderRadius: "20px 0px 0px 20px",
                }}
              >
                <categoryData.icon style={{ color: categoryData.iconColor }} />
                {blog.category}
              </span>
            )}
          </div>

          {/* title + author + stats */}
          <div className="p-6">
            <h1 className="text-[24px] sm:text-[30px] font-bold text-orange-500">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between mt-4">

              {/* author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white flex items-center justify-center rounded-full font-semibold">
                  {blog?.author?.name?.substring(0, 1)}
                </div>

                <p className="text-lg font-semibold text-gray-800">
                  {blog?.author?.name}
                </p>
              </div>

              {/* view + like */}
              <div className="flex items-center gap-6 text-lg font-semibold text-gray-700">

                <span className="flex items-center gap-2">
                  <FaEye className="text-[#0077b6]" />
                  {blog.viewCount || 0}
                </span>

                <button
                  onClick={handleThumbLike}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#0077b6]"
                >
                  {thumbLiked ? (
                    <FaThumbsUp className="text-[#0077b6]" />
                  ) : (
                    <FaRegThumbsUp className="text-[#0077b6]" />
                  )}
                  {thumbCount}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="max-w-5xl mx-auto mt-6 bg-white rounded-3xl shadow-lg p-6 border border-[#E8EEF4]">
          <MarkdownEditor.Markdown
            source={blog.content}
            className="prose max-w-none font-semibold"
          />
        </div>

        {/* Comments */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="inline-flex items-center gap-2 text-2xl text-[#0077b6] font-bold mb-4">
            <FaRegComment className="text-[#0077b6]" />
            Comments
          </h2>

          {/* add comment box */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm mb-12 flex flex-col justify-between h-full">
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-[#0077b6] focus:ring-2 outline-none"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>

            <button
              onClick={addComment}
              className="mt-3 bg-gradient-to-r from-[#0077b6] to-[#00b4d8]
                text-white px-5 py-2 rounded-lg shadow-md hover:scale-[1.03] 
                hover:shadow-lg transition font-medium cursor-pointer self-end"
            >
              Post Comment
            </button>
          </div>

          {/* show comments */}
          <div className="space-y-6">
            {comments.length ? (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-white border border-[#E8EEF4] p-4 rounded-2xl shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white 
                       rounded-full flex items-center justify-center font-semibold">
                        {c.user.name.substring(0, 1).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">{c.user.name}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="font-medium text-gray-700">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet — add yours!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadBlog;