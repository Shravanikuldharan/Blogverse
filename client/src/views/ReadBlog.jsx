import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );
    setBlog(response.data.data);
  };

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`
      );
      if (response) {
        setComments(response.data.comments);
      }
    } catch (error) {
      toast.error("Error loading comments");
      console.log(error);
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
      if (response) {
        toast.success(response.data.message);
        setNewComment("");
        loadComments(); 
      }
    } catch (error) {
      console.log(error);
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

      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p>
        Published On:{" "}
        {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()}, Read by{" "}
        {blog.viewCount} people
      </p>

      <div className="flex items-center mb-4">
        <span className="text-xl bg-orange-400 px-4 py-1 rounded-full text-white">
          {blog.category}
        </span>

        <div className="flex items-center gap-2 my-2 ml-14">
          <div className="flex items-center justify-center font-semibold w-[35px] h-[35px] bg-orange-300 text-center text-white rounded-full text-xl">
            {blog?.author?.name?.substring(0, 1)}
          </div>
          <div>
            <p>{blog?.author?.name}</p>
            {/* <p>{blog?.author?.email}</p> */}
          </div>
        </div>
      </div>

      <MarkdownEditor.Markdown source={blog.content} />

      {/* Comment Section */}
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

        {/* Show Comments */}
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