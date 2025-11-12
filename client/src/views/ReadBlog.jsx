import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FaThumbsUp, FaRegThumbsUp, FaEye } from "react-icons/fa";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [thumbLiked, setThumbLiked] = useState(false);
  const [thumbCount, setThumbCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchBlog = async () => {
    try {
      // const response = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      // );
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}?view=true`
      );

      const data = response.data.data;
      setBlog(data);
      setThumbCount(
        data.thumbLikes || data.totalThumbLikes || data.likes || 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedThumbLikes =
      JSON.parse(localStorage.getItem("thumbLikedBlogs")) || [];
      setThumbLiked(storedThumbLikes.includes(slug));
  }, [slug]);

  const handleThumbLike = async () => {
    if (!isLoggedIn || !localStorage.getItem("token")) {
      toast.error("You’ve been logged out. Please log in to like 👍");
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

        const storedThumbLikes =
          JSON.parse(localStorage.getItem("thumbLikedBlogs")) || [];
        const updatedThumbLikes = [...new Set([...storedThumbLikes, slug])];
        localStorage.setItem("thumbLikedBlogs", JSON.stringify(updatedThumbLikes));
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

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`
      );
      setComments(response.data.comments || []);
    } catch (error) {
      toast.error("Error loading comments");
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setNewComment("");
      loadComments();
    } catch (error) {
      toast.error("You need to log in to post a comment.");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
    loadComments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Toaster />

      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>

      <div className="flex flex-wrap items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-orange-400 text-white rounded-full font-semibold text-lg">
            {blog?.author?.name?.substring(0, 1)}
          </div>
          <p className="font-medium text-gray-700">{blog?.author?.name}</p>
        </div>

        <span className="text-sm bg-pink-200 px-3 py-1 rounded-full text-[#BE5985] font-medium">
          {blog.category}
        </span>

        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <FaEye className="text-pink-500" /> {blog.viewCount || 0}
          </span>

          <button
            onClick={handleThumbLike}
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            {thumbLiked ? (
              <FaThumbsUp className="text-blue-600 text-lg" />
            ) : (
              <FaRegThumbsUp className="text-gray-500 text-lg hover:text-blue-600" />
            )}
            <span className="font-medium text-gray-700">{thumbCount}</span>
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <MarkdownEditor.Markdown source={blog.content} />
      </div>

      {/*comments */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-6">
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="3"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={addComment}
            className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Post Comment
          </button>
        </div>

        {/* show Comments */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-orange-300 text-white rounded-full flex items-center justify-center font-bold">
                    {comment.user.name.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="ml-1 text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;