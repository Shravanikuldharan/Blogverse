import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FaThumbsUp, FaRegThumbsUp, FaEye, FaComment, FaRegComment } from "react-icons/fa";
import { BLOG_CATEGORIES } from "../constants";
import Footer from "../components/Footer";
import { fetchWithCache } from "../utils/apiCache";
import "../index.css";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [thumbLiked, setThumbLiked] = useState(false);
  const [thumbCount, setThumbCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const categoryData = BLOG_CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === blog?.category?.toLowerCase()
  );

  // const fetchBlog = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/blogs/${slug}?view=true`
  //     );
  //     const data = response.data.data;
  //     setBlog(data);

  //     setThumbCount(data.thumbLikes || data.totalThumbLikes || data.likes || 0);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchBlog = async () => {
    const res = await fetchWithCache(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}?view=true`,
      `cache_blog_${slug}`
    );
    const data = res.data;
    setBlog(data);
    setThumbCount(data.thumbLikes || data.totalThumbLikes || data.likes || 0);
  };

  // const loadComments = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`
  //     );
  //     setComments(response.data.comments || []);
  //   } catch (error) {
  //     toast.error("Failed to load comments");
  //   }
  // };

  const loadComments = async () => {
    const res = await fetchWithCache(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
      `cache_comments_${slug}`,
       15 * 1000
    );
    setComments(res.comments || []);
  };

  useEffect(() => {
    fetchBlog();
    loadComments();
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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
      toast.error("Please write a comment");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Comment added Successfully!");
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
                  border: `0.1px solid ${categoryData.text}`,
                  borderRadius: "20px 0px 0px 20px",
                }}
              >
                <categoryData.icon style={{ color: categoryData.iconColor }} />
                {blog.category}
              </span>
            )}
          </div>

          {/* title + author + stats */}
<div className="p-4 sm:p-6 md:p-8 bg-white">

<div className="text-[22px] sm:text-[28px] font-bold text-orange-500 mb-4 sm:mb-8">
  {blog.title}
</div>


<div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3 sm:gap-4">

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-md sm:text-lg sm:w-10 sm:h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white rounded-full flex items-center justify-center font-semibold">
                  {blog?.author?.name?.substring(0, 1)}
                </div>
<p className="font-bold text-[14px] sm:text-[20px] text-gray-800">
                  {blog?.author?.name}
                </p>
              </div>

<div className="flex font-semibold text-sm sm:text-lg items-center gap-4 sm:gap-6 text-gray-700">
                <span className="flex items-center gap-2">
                  <FaEye className="text-[#0077b6]" />
                  <span>{blog.viewCount || 0}</span>
                </span>

                <button onClick={handleThumbLike}
                  className="cursor-pointer flex items-center gap-2 hover:text-[#0077b6] transition">
                  {thumbLiked ? <FaThumbsUp className="text-[#0077b6]" /> : <FaRegThumbsUp className="text-[#0077b6]" />}
                  <span>{thumbCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* blog content  */}
<div className="max-w-5xl mx-auto mt-6 sm:mt-8 bg-white shadow-lg border border-[#E8EEF4] rounded-3xl p-4 sm:p-6 md:p-8">
          <MarkdownEditor.Markdown source={blog.content} className="prose max-w-none font-semibold" />
        </div>

        {/* Comments */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="inline-flex items-center gap-2 text-2xl text-[#0077b6] font-bold mb-4">
            <FaRegComment className="text-[#0077b6]" />
            Comments
          </h2>

          {/* add comment box */}
<div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-2xl shadow-sm mb-8 sm:mb-12 flex flex-col justify-between h-full">
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
                hover:shadow-lg transition font-semibold cursor-pointer self-end"
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
                  className="bg-white border border-[#E8EEF4] p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white 
                       rounded-full flex items-center justify-center font-bold">
                        {c.user.name.substring(0, 1).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">{c.user.name}</p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm font-medium">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <p className="text-gray-700 font-medium ml-1">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadBlog;